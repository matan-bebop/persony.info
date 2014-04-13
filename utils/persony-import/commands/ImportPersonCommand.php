<?php

/**
 * Created by IntelliJ IDEA.
 * User: yurko
 * Date: 4/3/14
 * Time: 1:48 AM
 */
class ImportPersonCommand extends CConsoleCommand {
    public function actionIndex($dataDir, $clean = false) {
        if($clean){
            foreach (Yii::app()->db->createCommand('SHOW TABLES')->queryColumn() as $table) {
                Yii::app()->db->createCommand("TRUNCATE TABLE `$table`")->execute();
            }
        }

        $dataFiles = array_filter(scandir($dataDir), function ($item) { return strpos($item, '.json') > 1; });

        $persons = [];

        foreach ($dataFiles as $fileName) {
            $file = "$dataDir/$fileName";

            $this->log("Processing file $file");

            $data = CJSON::decode(file_get_contents($file));

            $person = new Person();
            $person->attributes = $data;

            $person->isFeatured = true;

            if ($person->photo && (strpos($person->photo, '.') === false)) {
                $person->photo .= '.jpg';
            }

            $this->log('Creating person: ' . $this->stringify($person->attributes));

            $person->save(false);

            $this->log("New person id: {$person->id}");

            $persons[] = [
                'person' => $person,
                'eventsData' => $data['events'],
            ];
        }

        $this->log("processing events...");
        foreach($persons as $entry){
            extract($entry);
            /** @var Person $person */
            /** @var array $eventsData */
            $this->log("Person [{$person->id}] $person->name");
            foreach ($eventsData as $eventAtrributes) {
                $this->log("Creating event: " . $this->stringify($eventAtrributes));
                $event = new Event();

                $event->attributes = $eventAtrributes;
                $event->published = true;

                $event->others = CJSON::encode($eventAtrributes['others']);
                $event->save(false);

                $this->log("New event id: {$event->id}");

                $this->log("Adding sources...");
                foreach ($eventAtrributes['sources'] as $sourceAttributes) {
                    $source = new Source();
                    $source->attributes = $sourceAttributes;
                    $source->Event_id = $event->id;

                    $this->log("Creating source: " . $this->stringify($sourceAttributes));
                    $source->save($sourceAttributes);
                    $this->log("New source id: {$source->id}");
                }


                $this->log("Setting up person-event relations...");
                /** @var CDbConnection $db */
                $db = Yii::app()->db;
                $db->createCommand()->insert('Events_Persons', ['Person_id' => $person->id, 'Event_id' => $event->id]);
                foreach($eventAtrributes['others'] as $name){
                    $other = Person::model()->findByAttributes(['name' => $name]);
                    if(!$other){
                        $parts = explode(' ', $name);
                        $tmp = $parts[0];
                        $parts[0] = isset($parts[1]) ? $parts[1] : '';
                        $parts[1] = $tmp;
                        $name = implode(' ', $parts);
                    }
                    $other = Person::model()->findByAttributes(['name' => $name]);

                    if($other){
                        $this->log("Adding additional relation with person [{$other->id}] $name");
                        $db->createCommand()->insert('Events_Persons', ['Person_id' => $other->id, 'Event_id' => $event->id]);
                    } else {
                        $this->log("Person $name not found");
                    }
                }
            }
        }
    }

    private function log($message){
        echo $message, "\n";
    }

    private function stringify($data) {
        return print_r($data, true);
    }
} 