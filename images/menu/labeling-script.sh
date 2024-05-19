#!/bin/bash

# Function to display usage
usage() {
  echo "Usage: $0"
  exit 1
}

# Prompt for the folder path
read -p "Enter the folder path: " folder_path

# Check if the folder exists
if [ ! -d "$folder_path" ]; then
  echo "Folder does not exist."
  exit 1
fi

# Navigate to the folder
cd "$folder_path" || exit

# Define the renaming pattern
declare -a old_filenames=(
  "image_part_001.png"
  "image_part_002.png"
  "image_part_003.png"
  "image_part_004.png"
  "image_part_005.png"
  "image_part_006.png"
  "image_part_007.png"
  "image_part_008.png"
  "image_part_009.png"
)

declare -a new_filenames=(
  "corner-top-left.png"
  "edge-top.png"
  "corner-top-right.png"
  "edge-left.png"
  "center.png"
  "edge-right.png"
  "corner-bottom-left.png"
  "edge-bottom.png"
  "corner-bottom-right.png"
)

# Loop through the arrays and rename files
for i in "${!old_filenames[@]}"; do
  old_filename="${old_filenames[$i]}"
  new_filename="${new_filenames[$i]}"
  if [ -e "$old_filename" ]; then
    mv "$old_filename" "$new_filename"
    echo "Renamed $old_filename to $new_filename"
  else
    echo "File $old_filename does not exist."
  fi
done
