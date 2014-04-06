<?php

/**
 * Created by IntelliJ IDEA.
 * User: yurko
 * Date: 4/3/14
 * Time: 1:48 AM
 */
class ImportPersonCommand extends CConsoleCommand {
    public function actionIndex($file) {
        $data = CJSON::decode(file_get_contents($file));
        $person = new Person();
        $person->attributes = $data;

        $person->isFeatured = true;
        $person->save(false);


        foreach($data['events'] as $eventAtrributes){
            $event = new Event();
            $event->attributes = $eventAtrributes;
            $event->save(false);

            foreach($eventAtrributes['sources'] as $sourceAttributes){
                $source = new Source();
                $source->attributes = $sourceAttributes;
                $source->Event_id = $event->id;
                $source->save($sourceAttributes);
            }

            /** @var CDbConnection $db */
            $db = Yii::app()->db;
            $db->createCommand()->insert('Events_Persons', ['Person_id' => $person->id, 'Event_id' => $event->id]);
        }
    }
} 