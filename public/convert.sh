#! /bin/bash
PORTRAIT=x2048
LANDSCAPE=2048x

# 변경하려는 이미지의 디렉토리 경로
image_dir="./original_photos/gallery"

# 크기 변경된 이미지를 저장할 디렉토리 경로
output_dir="./photos/gallery"

# 이미지 확장자
image_extension=".jpg" # 원하는 이미지 확장자로 변경


# 디렉토리 내 이미지 파일들을 탐색하고 크기 변경
for image in $(find "$image_dir" -type f -name "*$image_extension"); do
    # 이미지 크기 정보 가져오기
    image_info=$(identify "$image")
    image_width=$(echo "$image_info" | awk '{print $3}' | cut -dx -f1)
    image_height=$(echo "$image_info" | awk '{print $3}' | cut -dx -f2)

    # 새 이미지 파일 경로 생성
    new_image="${output_dir}/$(basename "$image")"

    # 이미지 크기 변경
    if [ $image_width -gt $image_height ]; then
        convert "$image" -resize $LANDSCAPE "$new_image"
    else
        convert "$image" -resize $PORTRAIT "$new_image"
    fi
    echo "이미지 $image ($image_width x $image_height) 크기 변경 완료"
done
