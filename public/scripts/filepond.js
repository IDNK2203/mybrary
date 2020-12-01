FilePond.registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImageResize,
  FilePondPluginImagePreview
);

FilePond.parse(document.body);

FilePond.setOptions({
  stylePanelAspectRatio: 150 / 100,
  imageResizeTargetWidth: 100,
  imageResizeTargetHeight: 150,
});
// const inputElement = document.querySelector('input[type="file"]');
// const pond = FilePond.create( inputElement );
