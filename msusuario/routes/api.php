<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware'=>'auth:sanctum'],function () {
    Route::post("/logout",[AuthController::class,"logout"]);


});
