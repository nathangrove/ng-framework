<?php


################################
# CONFIGURATION
################################
$secure_dir      = "/var/www/secure";  # where is our secure content at
$auth_default    = true;               # should we require authentication by defualt?
$auto_route      = true;               # should we try to auto route if contoller is found but not a route?
$generic_route   = true;               # activate the generic controller and router?
$schema_route    = true;               # turn on a schema or data model route? THIS IS DANGEROUS. USE FOR DEV/PROTOTYPING
################################



################################
# CONFIGURE DATABASE
################################
$db_name      = "phpframe";
$db_login     = "phpframe";
$db_password  = "pHpFr@m3";
$db_host      = "localhost";
################################


  
################################
# ROUTES
# route path => route controller
################################
$routes = array(
  #"/event/:id" => "event/controller.php",
);
################################



################################
# CONFIGURE PHP
################################
ini_set("display_errors", 0);
################################


################################
# SET CORS
################################
header("Access-Control-Allow-Origin: *");
################################



################################
# Libraries
################################

# include our datbase class
include "$secure_dir/lib/db.class.php";

# include api class
include "$secure_dir/lib/api.class.php";

# include auth class
include "$secure_dir/lib/auth.class.php";

################################


################################
# Dial up DB
################################
try {
  $db = new db($db_host, $db_login, $db_password, $db_name);
} catch (Exception $e) {
  print "Database connection failed";
  exit;
}
################################



################################
# Process the call...
################################
@$config->app_dir = $secure_dir;
@$config->auth_default = $auth_default;
@$config->auto_route = $auto_route;
@$config->generic_route = $generic_route;
@$config->schema_route = $schema_route;
@$config->libdir = __DIR__ . "/lib";

$api = new API($config,$routes);
$api->process();
################################






?>