## chat-space DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false, unique: true|
### Association
- has_many :messages
- has_many :groups

## groups デーブル
|Column|Type|Options|
|------|----|-------|
|name|string|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :users, through: :groups_users


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|null: false|
|body|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user



## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user