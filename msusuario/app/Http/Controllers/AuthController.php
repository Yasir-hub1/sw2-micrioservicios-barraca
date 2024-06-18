<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\ApiResponder;
use Laravel\Sanctum\Sanctum;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
    use ApiResponder;


    public function login(Request $request): JsonResponse
    {
         request()->validate([
            "name" => "required|string",
            "password" => "required|min:6|max:20",
            "device_name" => "required"

        ]);

        $user = User::select(["id","name","password"])
        ->where("name", $request->name)->first();


        /* Verificacion si el user existe */
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                "name" => [__("Credenciales incorrectas")]
            ]);
        }



        $token = $user->createToken('web', ['*'], now()->addHours(24))->plainTextToken;

        return $this->success(
            __("Bienvenid@"),
            [
                "user" => $user->toArray(),

                "token" => $token,
            ]
        );
    }

    //TODO: Funcion para cerrar sesion
    public function logout(): JsonResponse
    {
        //Recuperando el token
        $token = request()->bearerToken();

        /** @var PersonalAccessToken $model */

        $model = Sanctum::$personalAccessTokenModel;

        $accessToken = $model::findToken($token);
        /* si existe el token se eliminara */

        $accessToken->delete();


        return $this->success(
            __("Has cerrado sesion con exito!"),
            data: null,
            code: 204,

        );
    }
}
