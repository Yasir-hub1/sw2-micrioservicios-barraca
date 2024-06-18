<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Ciudad;
use App\Http\Controllers\CiudadController;
use App\Http\Controllers\ClienteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(ClienteController::class)->group(function () {
    Route::get('/customers', 'index');
    Route::get('/customers_for_id', 'customers_for_id');
    Route::post('/customer', 'store');
    Route::put('/customer-update', 'update');
    Route::post('/customer-delete', 'disable');



    Route::get('/customer/get_list_enabled', 'get_list_enabled');
    Route::get('/customer/select_customer', 'select_customer');
    Route::get('/customer/autocomplete_customer', 'autocomplete_customer');

    Route::get('/customer/update_customer', 'update_customer');

    Route::post('/customer/clientes_search', 'clientes_search');
});


Route::controller(CiudadController::class)->group(function () {
    Route::get('/city', 'index');
    Route::get('/city/get_cities', 'get_cities');
    Route::post('/city/store', 'store');
    Route::put('/city/update', 'update');
});
