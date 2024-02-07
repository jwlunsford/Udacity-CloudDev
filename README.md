# Udacity-CloudDev

projects for Cloud Dev nanodegree

## Project Image-Filter

- Add a query parameter to the filteredimage endpoint that includes a valid url for an image
- Example: /filteredimage?image_url=https://some-image-url
- The endpoint will read the image using Jimp, resize, convert the image to grayscale, and store the image in a temp directory. The returned image will be deleted after the response cycle completes.
