<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class CreateNotesAppDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:create-notes-app';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crea la base de datos notes_app';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $connection = config('database.default');
            $dbName = 'notes_app';

            $this->info("Creando la base de datos $dbName...");
            DB::statement("CREATE DATABASE IF NOT EXISTS $dbName");

            config(["database.connections.$connection.database" => $dbName]);
            DB::purge($connection);
            DB::reconnect($connection);

            $this->info("Base de datos $dbName creada o ya existe.");

            $this->info('Ejecutando migraciones...');
            Artisan::call('migrate', ['--database' => $connection]);
            $this->info(Artisan::output());

            $this->info('Base de datos y tabla notes configuradas exitosamente.');

            $this->info('Ejecutando seeder...');
            Artisan::call('db:seed', ['--class' => 'DatabaseSeeder']);
            $this->info(Artisan::output());

            $this->info('Base de datos, tabla notes y datos de prueba configurados exitosamente.');

        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
}
