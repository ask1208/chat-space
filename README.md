## chat-space DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string||
|body|text||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- has_many :groups_users

## groups デーブル
|Column|Type|Options|
|------|----|-------|
|group|text||
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :groups_users
- has_many  :messages,  through:  :groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user