const { sequelize, Romaneo, Producto, DetalleRomaneo } = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");

const store = async (req, res) => {
  console.log("recibiendo datos ", req.body);
  const t = await sequelize.transaction();

  try {
    const data = {};

    // desestructurar los datos del formulario
    const material = {
      especie_id: req.body.especie_id,
      espesor: req.body.espesor,
      ancho: req.body.ancho,
      largo: req.body.largo,
      cantidad: req.body.cantidad,
    };

    // datos del romaneo
    const romaneoData = {
      fecha_registro: moment().format("YYYY-MM-DD"),
      fecha_entrega: req.body.fecha_registro,
      descripcion: req.body.descripcion.trim(),
      total_pie_cuadrado: parseFloat(req.body.total_pie_cuadrado).toFixed(2),
      estado: "INGRESADO",
      tipo_romaneo: "Normal",
    };

    // crear romaneo
    const romaneo = await Romaneo.create(romaneoData, { transaction: t });
    const romaneo_id = romaneo.id;

    let sumaAnchos = 0;
    let totalPies = 0;
    let i = 0;

    // procesar cada material
    for (const [index, especie_id] of material.especie_id.entries()) {
      const datos = material.ancho[index].split("-");
      const anchos = [...new Set(datos)];
      const cantidades = {};
      datos.forEach((ancho) => {
        cantidades[ancho] = (cantidades[ancho] || 0) + 1;
      });

      const anchosSinRepetir = anchos;
      const cantidadAnchos = anchos.map((ancho) => cantidades[ancho]);
      let producto_stored = null;

      for (const [indexAnchos, anchoSinRepetir] of anchosSinRepetir.entries()) {
        const cantidad_iteracion =
          material.cantidad[index] > 0
            ? material.cantidad[index]
            : cantidadAnchos[indexAnchos];
        const productoData = {
          especieId: especie_id,
          codigo: "0" + ((await Producto.max("id")) + 1),
          espesor: material.espesor[index],
          ancho: anchoSinRepetir,
          largo: material.largo[index],
          cantidad: cantidad_iteracion,
          cantidad_pies: parseFloat(
            (
              (material.espesor[index] *
                anchoSinRepetir *
                material.largo[index] *
                cantidad_iteracion) /
              12
            ).toFixed(2)
          ),
          cantidad_ingresada: cantidad_iteracion,
          estado: "Disponible",
          romaneoId: romaneo_id,
        };

        // verificar si el producto ya existe
        producto_stored = await Producto.findOne({
          where: {
            especieId: productoData.especieId,
            espesor: productoData.espesor,
            ancho: productoData.ancho,
            largo: productoData.largo,
          },
          transaction: t,
        });

        if (producto_stored) {
          // se actualizan las cantidades del producto existente
          producto_stored.cantidad += cantidad_iteracion;
          producto_stored.cantidad_pies = parseFloat(
            (
              (material.espesor[index] *
                anchoSinRepetir *
                material.largo[index] *
                producto_stored.cantidad) /
              12
            ).toFixed(2)
          );
          await producto_stored.save({ transaction: t });
        } else {
          // se crea un nuevo producto
          producto_stored = await Producto.create(productoData, {
            transaction: t,
          });
        }

        data[`producto_${i}`] = producto_stored;
        sumaAnchos += anchoSinRepetir * cantidad_iteracion;
        i++;
      }

      // calcula el total de pies
      const totalPiesEspecie = parseFloat(
        (
          (material.espesor[index] * sumaAnchos * material.largo[index]) /
          12
        ).toFixed(2)
      );
      const medida = `${material.espesor[index]} x ${material.largo[index]}`;

      // se crea el detalle del romaneo
      const detalleData = {
        espesor_largo: medida,
        lista_anchos: JSON.stringify(material.ancho[index]),
        ancho_total: sumaAnchos,
        pie_total: totalPiesEspecie,
        cantidad: material.cantidad[index],
        romaneoId: romaneo_id,
        especieId: especie_id,
        productoId: producto_stored.id
      };

      data[`detalle_${i}`] = await DetalleRomaneo.create(detalleData, {
        transaction: t,
      });
      totalPies += totalPiesEspecie;
      sumaAnchos = 0;
    }

    // se actualiza los totales en el romaneo
    await Romaneo.update(
      {
        total_pie_cuadrado: totalPies,
        cantidad_productos: i,
      },
      {
        where: { id: romaneo_id },
        transaction: t,
      }
    );

    data.romaneo = await Romaneo.findByPk(romaneo_id, { transaction: t });

    await t.commit();
    res.json(data);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

module.exports = { store };
