<?php


class api_module extends api_super {
  
  function _get($variables){

    # sanity check...
    if ($variables['table'] == '') return false;

    $table = $variables['table'];
    $id = $variables['id'];
    $id = $id == '' ? false : $id;

    if ($id !== false){
      $t = new dbo($table, $id);
      if (!$t) $this->error("Resource not found");
      $this->respond($t->row);
    } else {
      $t = new dbo($table);
      $t->find();

      $res = [];
      while ($t->fetch()) $res[] = $t->row;

      $this->respond($res);
    }

    return true;
  }




  function _post($variables){
    # sanity check...
    if ($variables['table'] == '') $this->error("Invalid model");
    $table = $variables['table'];

    $t = new dbo($table);
    foreach ($_REQUEST as $key => $value)
      $t->$key = $value == '' ? 'NULL' : $value;

    if (!$t->insert()) $this->error($t->err);

    $this->respond($t->row);

    return true;
  }




  function _put($variables){
    # sanity check...
    if ($variables['table'] == '') $this->error("Invalid model");
    if ($variables['id'] == '') $this->error("Invalid object");

    $table = $variables['table'];
    $id = $variables['id'];

    $t = new dbo($table,$id);
    foreach ($_REQUEST as $key => $value)
      $t->$key = $value == '' ? 'NULL' : $value;

    if (!$t->update()) $this->error($t->err);

    $this->respond($t->row);
    
    return true;
  }
  




  function _delete($variables){

    # sanity check...
    if ($variables['table'] == '' || $variables['id'] == '') return false;

    $table = $variables['table'];
    $id = $variables['id'];

    $t = new dbo($table, $id);
    if(!$t->delete()) $this->error($t->err);
    return true;
  }


}

?>