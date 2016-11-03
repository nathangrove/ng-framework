<?php

class api_module extends api_super {

	function _get($variables) {

		$model_protections = json_decode(file_get_contents(__DIR__."/protected.models.json"),true);

		# check for table...
		if ($variables['table'] == '') return false;

		$table = $variables['table'];

		# special request for all available models
		if ($table == 'available_models') {
			$t = new dbo();
			$t->query("show tables");

			$ts = [];
			while ($t->fetch()){
				$table_name = array_values(get_object_vars($t->row))[0];
				if (in_array("*", $model_protections[$table_name])) continue;
				$ts[] = $table_name;
			}

			$this->respond($ts);
      exit;
    }


    # They are requesting a specific table...
		$t = new dbo($table);
		$fields = $t->get_schema();

		# start building the response;
		$response = [];

		# make the fields lower case...
		foreach ($fields as $key => $field) {
			$field = (array)$fields[$key];
      #var_dump(in_array($field['Field'], $model_protections[$table]));
			if (!in_array($field['Field'], $model_protections[$table])){
        #var_dump(in_array($field['Field'], $model_protections[$table]));
        $fields[$key] = $field;
        foreach ($fields[$key] as $k => $v) {
          $response[$key][strtolower($k)] = $v;
        }
      }
		}
		$this->respond(array_values($response));
	}

}

?>