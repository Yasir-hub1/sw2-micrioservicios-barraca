<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CiudadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            DB::table('ciudads_collection')->insert([
                'name'=>'Santa Cruz',
            ]);
            DB::table('ciudads_collection')->insert([
                'name'=>'Cochabamba',
            ]);
            DB::table('ciudads_collection')->insert([
                'name'=>'La Paz',
            ]);
            DB::table('ciudads_collection')->insert([
                'name'=>'Oruro',
            ]);
            DB::table('ciudads_collection')->insert([
                'name'=>'Potosi',
            ]);
            DB::table('ciudads_collection')->insert([
                'name'=>'Sucre',
            ]);
            DB::table('ciudads_collection')->insert([
                'name'=>'Beni',
            ]);
            DB::table('ciudads_collection')->insert([
                'name'=>'Pando',
            ]);
            DB::table('ciudads_collection')->insert([
                'name'=>'Tarija',
            ]);


    }
}
