class ImageUploader < CarrierWave::Uploader::Base

  storage :file
def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  include CarrierWave::MiniMagick
  process resize_to_fit: [800, 800]

end
