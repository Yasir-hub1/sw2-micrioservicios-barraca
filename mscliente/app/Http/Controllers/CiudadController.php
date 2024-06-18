<?php

namespace App\Http\Controllers;

use App\Models\Ciudad;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CiudadController extends Controller
{
    public function index(){
        $city=Ciudad::all();
        return response()->json(['data'=>$city],Response::HTTP_OK);

    }
}
