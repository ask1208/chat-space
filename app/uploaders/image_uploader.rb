class ImageUploader < CarrierWave::Uploader::Base

  storage :fog
def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  include CarrierWave::MiniMagick
  process resize_to_limit: [200, 200]

end
