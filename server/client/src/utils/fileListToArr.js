export default (fileList) => {
  if (!fileList) {
    return null;
  }

  var length = fileList.length;
  var fileArray = new Array(length);

  for (var i = 0; i < length; i++) {
    fileArray[i] = fileList[i];
  }

  return fileArray;
};
