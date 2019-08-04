import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ColorLens from '@material-ui/icons/ColorLens';
import PulseLoader from 'react-spinners/PulseLoader';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';

import imgPreview from './img/imgPreview.png';

import {
  Container,
  Card,
  Title,
  ConfigPanel,
  PreviewPanel,
  DragContainer,
  UploadText,
  PropsDivider,
  PreviewContainer,
  ImagePreview,
  ButtonContainer,
  ClearButton,
  GenerateButton,
  OptionsContainer,
  ColorPickerPopover,
  ColorPickerCover,
  TextField
} from './styles';

class App extends Component {
  state = {
    isLoadingImage: false,
    imgTitle: 'Preview image',
    imgSource: imgPreview,

    displayColorPicker: false,

    color: '#1976d2',
    baseSize: 56,
    name: 'ic_icon',
    density: 300
  };

  onDrop = acceptedFiles => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];
    const reader = new FileReader();

    this.setState({
      title: selectedFile.name,
      name: selectedFile.name
        .split('.')
        .slice(0, -1)
        .join('.'),
      isLoadingImage: true
    });

    reader.onload = event => {
      this.setState({
        imgSource: event.target.result,
        isLoadingImage: false
      });
    };

    reader.readAsDataURL(selectedFile);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClear = () => {
    this.setState({
      color: '#1976d2',
      baseSize: 56,
      name: 'ic_icon',
      density: 300
    });
  };

  handleGenerate = () => {
    alert('Not done yet');
  };

  handleCloseColorPicker = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChangeColorPicker = color => {
    this.setState({ color: color.hex });
  };

  handleOpenPicker = () => {
    this.setState({ displayColorPicker: true });
  };

  render() {
    const {
      imgSource,
      imgTitle,
      isLoadingImage,
      color,
      name,
      baseSize,
      density,
      displayColorPicker
    } = this.state;

    return (
      <Container>
        <Card>
          <ConfigPanel>
            <Title>Settings</Title>

            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <DragContainer {...getRootProps()}>
                  <input {...getInputProps()} />

                  <UploadText>Drag a file or click to select</UploadText>
                </DragContainer>
              )}
            </Dropzone>

            <PropsDivider />

            <OptionsContainer>
              <TextField
                label="Color"
                value={color}
                onChange={this.handleChange('color')}
                InputProps={{
                  style: { color },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="show color picker"
                        onClick={this.handleOpenPicker}
                      >
                        <ColorLens style={{ color }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {displayColorPicker ? (
                <ColorPickerPopover>
                  <ColorPickerCover onClick={this.handleCloseColorPicker} />
                  <ChromePicker
                    color={color}
                    onChange={this.handleChangeColorPicker}
                  />
                </ColorPickerPopover>
              ) : null}

              <TextField
                label="Base size"
                type="number"
                value={baseSize}
                onChange={this.handleChange('baseSize')}
              />

              <TextField
                label="Name"
                value={name}
                onChange={this.handleChange('name')}
              />

              <TextField
                label="Density"
                type="number"
                value={density}
                onChange={this.handleChange('density')}
              />
            </OptionsContainer>

            <PropsDivider />

            <ButtonContainer>
              <ClearButton onClick={this.handleClear}>Clear</ClearButton>
              <GenerateButton onClick={this.handleGenerate}>
                Generate
              </GenerateButton>
            </ButtonContainer>
          </ConfigPanel>

          <PreviewPanel>
            <Title>Preview</Title>

            <PreviewContainer>
              {isLoadingImage ? (
                <PulseLoader sizeUnit={'px'} size={20} color={'#262a41'} />
              ) : (
                <ImagePreview
                  id="imgPreview"
                  title={imgTitle}
                  src={imgSource}
                  alt="Preview"
                />
              )}
            </PreviewContainer>
          </PreviewPanel>
        </Card>
      </Container>
    );
  }
}

export default App;
