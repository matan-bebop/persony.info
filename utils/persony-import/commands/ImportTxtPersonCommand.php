<?php

/**
 * Created by IntelliJ IDEA.
 * User: yurko
 * Date: 4/3/14
 * Time: 2:08 AM
 */
class ImportTxtPersonCommand extends CConsoleCommand {

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

        $person->isFeatured = true;
        $person->save(false);

		$lineNumber = 0;

        $event = new Event();
        foreach($data as $line){
			
			$date = strtotime($line);
			$lineNumber++;

			if ($date){
				$lineNumber = 0;
	            $event->save(false);
	            $event = new Event();
			}

            if(!empty($line)){
                switch ($lineNumber) {
                    case 0:
                        $event->start = $date;
					break;
                    case 1:
                        $event->title = $line;
					break;
                    case 2:
                        $event->description = $line;
					break;
                    default:
                        $this->fillSource($line, $event->id, $person->id);
					break;
                }
            }
        }
    }
} 
