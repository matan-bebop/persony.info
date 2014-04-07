<?php

/**
 * Created by IntelliJ IDEA.
 * User: yurko
 * Date: 4/3/14
 * Time: 2:08 AM
 */
class ImportPersonCommand extends CConsoleCommand {

	private function read_file($filename = ''){
		$buffer = array();
		$source_file = fopen( $filename, "r" ) or die("Couldn't open $filename");
		while (!feof($source_file)) {
		    $buffer[] = fread($source_file, 4096);  // use a buffer of 4KB
		}
		return $buffer;
	}

	private function fillSource($line, $eventId, $personId){

		$sourceDsc = explode(", ", $line);

	    $source = new Source();
	    $source->$title = $sourceDsc[0];
	    $source->$link = $sourceDsc[1];
	    $source->Event_id = $eventId;
	    $source->save(false);

		/** @var CDbConnection $db */
		$db = Yii::app()->db;
		$db->createCommand()->insert('Events_Persons', ['Person_id' => $personId, 'Event_id' => $eventId]);	

	}

    public function actionIndex($file) {
        $data = $this->read_file($file);
        $person = new Person();
        //$person->attributes = ''; // not the same format in the documents, skip

        $person->isFeatured = true;
        $person->save(false);

		$lineNumber = 0;

        foreach($data as $line){
			
			$date = strtotime($line)
			$lineNumber++;

			if ($date){
				$lineNumber = 0;
	            $event->save(false);
	            $event = new Event();
			}

			switch ($lineNumber) {
				case 0:
					empty($line) ? break : $event->start = $date; 
					break;
				case 1:
					empty($line) ? break : $event->title = $line; 
					break;
				case 2:
					empty($line) ? break : $event->description = $line; //not the same format in the documents, skip pml
					break;
				default:
					empty($line) ? break : $this->fillSource($line, $event->id, $person->id); //not the same format in the documents, skip pml
					break;
			}

        }
    }
} 
