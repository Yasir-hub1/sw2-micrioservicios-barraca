<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClienteController extends Controller
{
    public function index()
    {
        $customer= Cliente::all()->where("state",1);
        return response()->json(['data'=>$customer],Response::HTTP_OK);
    }

        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // $identity_document_type = IdentityDocumentType::find($request->identity_document_type_id);
            $customer = new Cliente();
            $customer->code=Cliente::max('code')+1;
            $customer->nit=$request->nit;
            // $customer->invoice_name= mb_strtoupper($request->invoice_name);
            $customer->ci=$request->ci;
            $customer->complement= strtoupper($request->complement);
            $customer->name= mb_strtoupper($request->name);
            $customer->phone=$request->phone;
            // $customer->phone2=$request->phone2;
            $customer->address=$request->address;
            $customer->email=$request->email;
            $customer->state=1;
            // $customer->identity_document_type_code=$identity_document_type?$identity_document_type->classifier_code:0;
            // $customer->birthday=$request->birthday;
            $customer->city_id=$request->city_id;
            // $customer->synchronized=1;
            // $customer->identity_document_type_id=$identity_document_type?$identity_document_type->id:null;
            $customer->save();
            return response()->json(['data'=>$customer],Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            // $identity_document_type = IdentityDocumentType::find($request->identity_document_type_id);

            $customer = Cliente::findOrFail($request->id);
            $customer->nit=$request->nit;
            // $customer->invoice_name= mb_strtoupper($request->invoice_name);
            $customer->ci=$request->ci;
            $customer->name=mb_strtoupper($request->name);
            $customer->complement= strtoupper($request->complement);
            $customer->phone=$request->phone;
            // $customer->phone2=$request->phone2;
            $customer->address=$request->address;
            $customer->email=$request->email;
            // $customer->identity_document_type_code=$identity_document_type->classifier_code;
            // $customer->birthday=$request->birthday;
            $customer->city_id=$request->city_id;
            // $customer->identity_document_type_id=$identity_document_type->id;
            // $customer->synchronized=1;
            $customer->save();
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    public function disable(Request $request)
    {
        $customer = Cliente::find($request->id);
        $customer->state=2;
        $customer->save();
    }

    public function enable(Request $request)
    {
        $customer = Cliente::findOrFail($request->id);
        $customer->state=1;
        $customer->save();
    }

    public function get_list_enabled()
    {
        $customers = Cliente::where('state', '=', 1)
                             ->select('id','name','nit')->get();
        return response()->json($customers);
    }

    public function select_customer(Request $request){
        if (!$request->ajax()) return redirect('/');

       // $filtro = $request->filtro;
        $customers = Cliente::where('name', 'ilike', '%'.  $request->name . '%')
        ->orWhere('nit', 'ilike', '%'. $request->nit . '%')
        ->select('id','nit','name')
        ->orderBy('name', 'asc')->get();

        return ['customers' => $customers];
    }

    public function update_customer(){
        $customers = Cliente::all();
        foreach ($customers as $row) {
            $row->nit=trim($row->nit);
            $row->invoice_name=trim($row->invoice_name);
            $row->name=trim($row->name);
            $row->save();
        }
        echo 'result';
    }

    public function autocomplete_customer(Request $request)
    {
        $customers = Cliente::where('state',1)
                                ->where(function ($query) use ($request) {
                                    // $query->where('product.'.$where, 'ilike', '%' . $q . '%')
                                    $query->where('name','like', '%'.$request->search.'%')
                                    ->orWhere('nit', 'like', '%'. $request->search . '%')
                                    ->orWhere('ci', 'like', '%'. $request->search . '%');
                                })->limit(10);

                $customers =  $customers->select('_id','nit','name','email','complement')->get();

        return response()->json($customers);
    }

    //metodo para la vista de ventas con nit
    function clientes_search(Request $request) {
        $search_customers = Cliente::where(function($query) use ($request) {
            $query->where('nit', 'LIKE', '%'.$request->search.'%')
                  ->orWhere('name', 'LIKE', '%'.$request->search.'%');
        })
        ->whereNotIn('id', [1, 2, 3, 4])
        ->get();
        return response()->json($search_customers, 200);
    }




    public function customers_for_id(Request $request) {
        $customer=Cliente::find($request->id);
        return response()->json($customer, 200);
    }
}

