import os
import zipfile
import shutil

# Define the source and destination directories
src_dir = './src'
dist_dir = './dist'
output_zip_path = os.path.join(dist_dir, 'telegram-link-handler.zip')

# Create the dist directory if it doesn't exist
os.makedirs(dist_dir, exist_ok=True)

# Create a temporary directory to hold the files for zipping
temp_dir = os.path.join(dist_dir, 'temp')
os.makedirs(temp_dir, exist_ok=True)

# Copy the src directory to the temporary directory
shutil.copytree(src_dir, temp_dir, dirs_exist_ok=True)

# Create a zip file
with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    # Walk through the temporary directory and add files to the zip
    for root, dirs, files in os.walk(temp_dir):
        for file in files:
            # Create the relative path for the zip file
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, temp_dir)
            zipf.write(file_path, arcname)

# Clean up the temporary directory
shutil.rmtree(temp_dir)

print(f'Created ZIP archive: {output_zip_path}')
