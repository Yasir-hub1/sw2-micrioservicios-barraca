/// controlador de registro de romaneo 
<?php

//namespace App\Http\Controllers\Barracas;

use App\Romaneo;
use App\Producto;
use App\DetalleRomaneo;
use Illuminate\Http\Request;
use App\Http\Requests\RomaneoStoreRequest;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\DataTable\Traits\Datatable;
use App\DataTable\Tables\Builders\RomaneoTable;
use App\Exports\Inventory_enteredExport;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;


class RomaneoController extends Controller
{

    use Datatable;

    protected $tableClass = RomaneoTable::class;
    public function __construct()
    {
        //$this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Romaneo::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RomaneoStoreRequest $request)
    {

        try {
            $data = [];

            DB::beginTransaction();

            $material['especie_id'] = $request->input('especie_id');
            $material['espesor'] = $request->input('espesor');
            $material['ancho'] = $request->input('ancho');
            $material['largo'] = $request->input('largo');
            $material['cantidad'] = $request->input('cantidad');

            //return $material;
            $sesion = session('usuario_sesion');
            $romaneo['fecha_registro'] = Carbon::now()->toDateString();
            $romaneo['fecha_entrega'] = $request->input('fecha_registro');
            $romaneo['descripcion'] = trim($request->input('descripcion'));
            $romaneo['total_pie_cuadrado'] = floatval(number_format(trim($request->input('total_pie_cuadrado')), 2)) ;
            $romaneo['estado'] = 'INGRESADO';
            $romaneo['tipo_romaneo'] = 'Normal';
            $romaneo['sucursal_id'] = session('branch_office_id');

            //$data["romaneo"]=Romaneo::create($romaneo);
            //$romaneo_id = $data["romaneo"]->id;
            $romaneo=Romaneo::create($romaneo);
            $romaneo_id = $romaneo->id;
            // Variable para la suma de anchos
            $sumaAnchos = 0;
            $totalPies = 0;
            $i=0;
            //return $romaneo_id;
            foreach ($material['especie_id'] as $index => $especie_id) {
                $datos = explode('-', $material['ancho'][$index]);
                $anchos = array_unique($datos);
                $cantidades = array_count_values($datos);
                $anchosSinRepetir = array();
                $cantidadAnchos = array();

                foreach ($anchos as $row) {
                    $anchosSinRepetir[] = $row;
                }

                foreach ($cantidades as $row1) {
                    $cantidadAnchos[] = $row1;
                }
                $producto_stored=0;
                foreach ($anchosSinRepetir as $indexAnchos => $anchoSinRepetir) {
                    $producto['especie_id'] = $especie_id;
                    $producto['codigo']='0' . (Producto::max('id') + 1);
                    $producto['espesor'] = $material['espesor'][$index];
                    $producto['ancho'] = $anchoSinRepetir;
                    $producto['largo'] = $material['largo'][$index];
                    $cantidad_iteracion=$material['cantidad'][$index]>0?$material['cantidad'][$index]:$cantidadAnchos[$indexAnchos];
                    $producto['cantidad'] = $cantidad_iteracion;
                    $producto['cantidad_pies'] = round(floatval(( $material['espesor'][$index] * $anchoSinRepetir * $material['largo'][$index] * $cantidad_iteracion) / 12),2);
                    $producto['cantidad_ingresada'] = $cantidad_iteracion;
                    $producto['estado'] = 'Disponible';
                    $producto['romaneo_id'] = $romaneo_id;
                    $data["producto"][$i]=$producto;

                    // Verificamos si existe
                    if ($this->existeMateria($producto) > 0) {
                        // Sumamos la cantidad ingresada con la existente
                        $get_producto=Producto::where('especie_id', $producto['especie_id'])
                            ->where('espesor', $producto['espesor'])
                            ->where('ancho', $producto['ancho'])
                            ->where('largo', $producto['largo'])->first();
                        $get_producto->cantidad=$get_producto->cantidad+$cantidad_iteracion;
                        $get_producto->cantidad_pies=round(floatval(( $material['espesor'][$index] * $anchoSinRepetir * $material['largo'][$index] * $get_producto->cantidad) / 12),2);
                        $get_producto->save();
                        $producto_stored=$get_producto;
                        $data["producto"][$i]=$producto_stored;

                        /*$data["producto"][$i]=Producto::where('especie_id', $producto['especie_id'])
                        ->where('espesor', $producto['espesor'])
                        ->where('ancho', $producto['ancho'])
                        ->where('largo', $producto['largo'])->get();*/
                    } else {
                        // Insertamos las materias
                        $producto_stored=Producto::create($producto);
                        $data["producto"][$i]=$producto_stored;
                        //DB::table('productos')->insert($producto);
                    }
                    $i=$i+1;
                    // Sumamos los anchos
                    $sumaAnchos += $anchoSinRepetir * $cantidad_iteracion;
          
                }
                
                // Calculamos el pie total
                $totalPiesEspecie = round(floatval(($material['espesor'][$index] * $sumaAnchos * $material['largo'][$index]) / 12),2);

                // Registramos los datos en el detalle romaneo
                $medida = $material['espesor'][$index] . ' x ' . $material['largo'][$index];
                $datos_detalle = [
                    'romaneo_id' => $romaneo_id,
                    'especie_id' => $especie_id,
                    'espesor_largo' => $medida,
                    'lista_anchos' => json_encode($material['ancho'][$index]),
                    'ancho_total' => $sumaAnchos,
                    'pie_total' => $totalPiesEspecie,
                    'cantidad' => $material['cantidad'][$index],
                    'producto_id' => $producto_stored->id
                ];
                $sumaAnchos=0;
                $data["detalle"][$i]=
                DetalleRomaneo::create($datos_detalle);
                // Sumamos los pies totales
                $totalPies += $totalPiesEspecie;
                $data["total_pies"][$i]=$totalPiesEspecie;
            }

            // Actualizamos los totales en pies y anchos
            DB::table('romaneos')->where('id', $romaneo_id)->update(['total_pie_cuadrado' => $totalPies,'cantidad_productos'=>$i]);
            $data["romaneo"]= Romaneo::find($romaneo_id);

            DB::commit();

            return $data;
            } catch (\Exception $e) {

                DB::rollback();
                abort(500,$e);
                //return response()->json(["error"=>$e], 200);
            }



            /*$store = new Romaneo($request->all());
            $store->sucursal_id=$request->sucursal_id;
            $store->save();*/
    }



    

    /**
     * Display the specified resource.
     *
     * @param  \App\Romaneo  $romaneo
     * @return \Illuminate\Http\Response
     */
    public function show(Romaneo $romaneo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Romaneo  $romaneo
     * @return \Illuminate\Http\Response
     */
    public function edit(Romaneo $romaneo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Romaneo  $romaneo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Romaneo $romaneo)
    {
        try {
            $data = Romaneo::findOrFail($request->id);
            $data->update($request->all());
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Romaneo  $romaneo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Romaneo $romaneo)
    {
        //pendiente
    }

    function existeMateria($material)
    {
        $array = [
            'especie_id' => $material['especie_id'],
            'espesor' => $material['espesor'],
            'ancho' => $material['ancho'],
            'largo' => $material['largo'],
        ];

        $existeMateria = Producto::where($array)->count();

        return $existeMateria;
    }

    public function listarRomaneoPorLote()
    {
        try {

            $listaRomaneo = DB::table('romaneos')
                ->select(
                    'romaneos.id',
                    'romaneos.descripcion',
                    DB::raw('count(productos.cantidad) '),
                    'romaneos.fecha_registro',
                    DB::raw('sum(productos.cantidad_pies)')
                )
                ->join('productos', 'productos.romaneo_id', '=', 'romaneos.id')
                ->groupBy('romaneos.id')
                ->get();
        } catch (\Throwable $th) {
            throw $th;
        }
        return  $listaRomaneo;
    }
    public  function listarDetalleRomaneo(Request $request)
    {


        try {
            $listaDetalle = DB::table('detalle_romaneos')
                ->select(["especies.nombre", "productos.espesor", "productos.ancho", "productos.largo", "detalle_romaneos.cantidad", "detalle_romaneos.pie_total"])
                ->join('productos', 'productos.id', '=', 'detalle_romaneos.producto_id')
                ->join('romaneos', 'romaneos.id', '=', 'detalle_romaneos.romaneo_id')
                ->join('especies', 'especies.id', '=', 'detalle_romaneos.especie_id')
                ->where('detalle_romaneos.romaneo_id', $request->id_romaneo)
                ->get();
            /* $listaDetalle = DB::table('especies')
                ->select(["especies.nombre", "productos.espesor", "productos.ancho", "productos.largo", "productos.cantidad", "productos.cantidad_pies"])
                ->join('productos', 'productos.especie_id', '=', 'especies.id')
                ->join('romaneos', 'romaneos.id', '=', 'productos.romaneo_id')
                ->where('romaneo_id', $request->id_romaneo)
                ->paginate(5);  */

            /*  $listaDetalle = Producto::whereHas('romaneo', function ($query) use ($id_romaneo) {
                                $query->where('id',$id_romaneo);
                            })->with('romaneo', 'especie')->get(); */
            return response()->json($listaDetalle);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function exportarExcelLoteDeRomaneo(Request $request)
    {
        $id_romaneo = $request->id_romaneo;
        $descripcion = $request->descripcion;
        $fecha_registro = $request->fecha_registro;
        $nombre_sucursal = $request->nombre_sucursal;
        $total_pies = $request->total_pies;

        return Excel::download(new Inventory_enteredExport(
            $id_romaneo,
            $nombre_sucursal,
            $fecha_registro,
            $descripcion,
            $total_pies
        ), 'Lote_romaneo.xlsx');
    }
}
