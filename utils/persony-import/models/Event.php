<?php

/**
 * This is the model class for table "Events".
 *
 * The followings are the available columns in table 'Events':
 * @property integer $id
 * @property string $start
 * @property string $start_draft
 * @property string $end
 * @property string $end_draft
 * @property string $title
 * @property string $title_draft
 * @property string $description
 * @property string $description_draft
 * @property string $created_by_key
 * @property integer $published
 * @property string $image
 * @property mixed others
 */
class Event extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'Events';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('published', 'numerical', 'integerOnly'=>true),
			array('title, title_draft, created_by_key, image', 'length', 'max'=>255),
			array('start, start_draft, end, end_draft, description, description_draft', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, start, start_draft, end, end_draft, title, title_draft, description, description_draft, created_by_key, published, image', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'start' => 'Start',
			'start_draft' => 'Start Draft',
			'end' => 'End',
			'end_draft' => 'End Draft',
			'title' => 'Title',
			'title_draft' => 'Title Draft',
			'description' => 'Description',
			'description_draft' => 'Description Draft',
			'created_by_key' => 'Created By Key',
			'published' => 'Published',
			'image' => 'Image',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('start',$this->start,true);
		$criteria->compare('start_draft',$this->start_draft,true);
		$criteria->compare('end',$this->end,true);
		$criteria->compare('end_draft',$this->end_draft,true);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('title_draft',$this->title_draft,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('description_draft',$this->description_draft,true);
		$criteria->compare('created_by_key',$this->created_by_key,true);
		$criteria->compare('published',$this->published);
		$criteria->compare('image',$this->image,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Event the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
