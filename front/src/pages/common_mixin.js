export const commonMixin = {
    data(){
        return {
            color:'',
        };
    },

    methods: {

        disable(data=[]){
            let me = this;
            swal({
                title: 'Esta seguro que desea eliminar este registro?',
                text: 'El estado del registro cambiara!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar registro!',
                cancelButtonText: 'No, cancelar',
                confirmButtonClass: "btn btn-success",
                cancelButtonClass: "btn btn-danger",
                buttonsStyling: false
            }).then(function () {
                axios.put(data.url, {
                    id: data.id
                }).then(function (response) {
                    console.log(response);
                    swal({
                        title: 'Eliminado!',
                        text: 'El registro ha sido eliminado.',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    }).catch(swal.noop);
                    me.$refs.refresh.fetch();
                }).catch(function (error) {
                    console.log(error);
                    swal({
                        title: 'Error',
                        text: 'Problemas al eliminar :)',
                        type: 'error',
                        confirmButtonClass: "btn btn-info",
                        buttonsStyling: false
                    }).catch(swal.noop)
                });
            }, function (dismiss) {

            });

        },
        enable(data=[]){
            let me = this;
            console.log(data.id);
            console.log(data.url);
            swal({
                title: 'Esta seguro que desea habilitar este registro?',
                text: 'El estado del registro cambiara!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, activar registro!',
                cancelButtonText: 'No, cancelar',
                confirmButtonClass: "btn btn-success",
                cancelButtonClass: "btn btn-danger",
                buttonsStyling: false
            }).then(function () {
                axios.put(data.url, {
                    id: data.id
                }).then(function (response) {
                    swal({
                        title: 'Activado!',
                        text: 'El registro ha sido activado.',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    }).catch(swal.noop);
                    me.$refs.refresh.fetch();
                }).catch(function (error) {
                    let er = error.response.data.errors;
                    let malert = er.id[0];
                    console.log(error);
                    console.log(malert);
                    let mensaje = 'Problemas al activar';
                    if (er.id) {
                        mensaje = malert;
                    }
                    swal({
                        title: 'Error',
                        text: mensaje,
                        type: 'error',
                        confirmButtonClass: "btn btn-info",
                        buttonsStyling: false
                    }).catch(swal.noop)
                });
            }, function (dismiss) {

            });
        },
        success_message(){
            swal({
                title: 'Deleted!',
                text: 'Your imaginary file has been deleted.',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
            }).catch(swal.noop);
        },
        error_message(){
            swal({
                title: 'Deleted!',
                text: 'Your imaginary file has been deleted.',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
            }).catch(swal.noop);
        },
        execute(name_method, data=[], tables=[]){
            switch (name_method) {
                case 'disable': {
                    this.disable(data);
                    break
                }
                case 'enable': {
                    this.enable(data);
                    break
                }
                case 'update': {
                    break
                }
            }
        },
        roundFormat: function(value, decimals) {
            return Number(
              Math.round(value + "e" + decimals) + "e-" + decimals
            ).toFixed(decimals);
        },
        isNumber: function (evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        isText: function (evt) {
            var letras_con_acento = [225,233,237,243,250,193,201,205,211,218,241,209,32];// "áéíóúÁÉÍÓÚñÑ"
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && ( charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122 ) && (letras_con_acento.indexOf(charCode)<0))) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        isDecimal(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 46 || charCode > 46))) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        roundFormat: function(value, decimals) {
            return Number(
              Math.round(value + "e" + decimals) + "e-" + decimals
            ).toFixed(decimals);
        },
        initializing_loading(){
            let me=this;
            if(me.$refs.loading){
                me.$refs.loading.start("Actualizando....");
            }
        },
        stop_loading(){
            let me=this;
            me.$refs.loading.stop();
        },
        get_url(url){
            return this.path+url;
        },
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        },
        factor(value) {
            return (value == '' || value == undefined || value == null)  ? 0 : value;
        },
        numero(value) {
            return (value == '' || value == undefined || value == null)  ? 0 : Number(value);
        },
    }
};