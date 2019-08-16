import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ColorLens from '@material-ui/icons/ColorLens';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const API_URL = 'http://localhost:3333';

class App extends Component {
  state = {
    isLoadingImage: false,
    imgTitle: 'Preview image',
    imgSource: imgPreview,
    isImageSelected: false,
    message: null,

    displayColorPicker: false,

    color: '#1976d2',
    baseSize: 56,
    name: 'ic_icon',
    density: 300
  };

  selectedImageFile = null;

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
        isLoadingImage: false,
        isImageSelected: true
      });
    };

    reader.readAsDataURL(selectedFile);
    this.selectedImageFile = selectedFile;
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClear = () => {
    this.setState({
      color: '#1976d2',
      baseSize: 56,
      name: 'ic_icon',
      density: 300,
      imgSource: imgPreview,
      isImageSelected: false
    });

    this.selectedImageFile = null;
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

  handleGenerate = async () => {
    if (!this.selectedImageFile) {
      this.setState({
        message: 'No image was selected'
      });
      return;
    }

    const { color, name, baseSize, density } = this.state;

    const bodyFormData = new FormData();
    bodyFormData.set('color', color);
    bodyFormData.set('baseSize', baseSize);
    bodyFormData.set('name', name);
    bodyFormData.set('density', density);
    bodyFormData.append('svgFile', this.selectedImageFile);

    try {
      const response = await axios({
        method: 'post',
        baseURL: API_URL,
        url: '/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: bodyFormData
      });

      const fileName = response.data;

      window.open(`${API_URL}/result/${fileName}`);
    } catch (err) {
      console.log(err);
      this.setState({
        message: 'Something went wrong while generating the imagens'
      });
    }
  };

  handleMsgClose = () => {
    this.setState({
      message: null
    });
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
      displayColorPicker,
      isImageSelected,
      message
    } = this.state;

    return (
      <Container>
        <Dialog
          open={!!message}
          onClose={this.handleMsgClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Attention</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleMsgClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>

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
                  isSelected={isImageSelected}
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
