import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CssBaseline from '@material-ui/core/CssBaseline';
import ColorLens from '@material-ui/icons/ColorLens';
import PulseLoader from 'react-spinners/PulseLoader';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import imgPreview from './img/imgPreview.png';

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    background: '#262a41',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  paper: {
    display: 'flex',
    flex: 1,
    height: 'calc(100vh - 60px)',
    overflow: 'hidden',
    maxWidth: 1000
  },
  configs: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
    minWidth: 350,
    padding: 10,
    background: '#cecece'
  },
  preview: {
    display: 'flex',
    flex: 1,
    padding: 10,
    flexDirection: 'column'
  },
  title: {
    marginBottom: 10,
    color: '#262a41'
  },
  uploadText: {
    flex: 1,
    margin: 5,
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: 18,
    color: '#262a41'
  },
  dragContainer: {
    display: 'flex',
    border: '2px #262a41 dashed',
    cursor: 'pointer',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  imgPreview: {
    width: 400,
    height: 400,
    alignSelf: 'center',
    justifySelf: 'center'
  },
  imgPreviewSelected: {
    border: '2px solid #262a41',
    borderRadius: 5
  },
  previewWrapper: {
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10
  },
  generateBtn: {
    marginLeft: 10,
    flex: 1
  },
  clearBtn: {
    marginRight: 10,
    flex: 1
  },
  optionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  popover: {
    position: 'absolute',
    zIndex: '2'
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  },
  textFieldLabel: {
    color: '#262a41'
  }
};

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
    const { classes } = this.props;
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
      <>
        <CssBaseline />
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <div className={classes.configs}>
              <Typography variant="h5" component="h3" className={classes.title}>
                Settings
              </Typography>

              <Dropzone onDrop={this.onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div className={classes.dragContainer} {...getRootProps()}>
                    <input {...getInputProps()} />

                    <Typography component="h6" className={classes.uploadText}>
                      Drag a file or click to select
                    </Typography>
                  </div>
                )}
              </Dropzone>

              <Divider light />

              <div className={classes.optionsWrapper}>
                <TextField
                  label="Color"
                  fullWidth
                  value={color}
                  onChange={this.handleChange('color')}
                  margin="normal"
                  InputLabelProps={{
                    className: classes.textFieldLabel
                  }}
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
                  <div className={classes.popover}>
                    <div
                      className={classes.cover}
                      onClick={this.handleCloseColorPicker}
                    />
                    <ChromePicker
                      color={color}
                      onChange={this.handleChangeColorPicker}
                    />
                  </div>
                ) : null}

                <TextField
                  label="Base size"
                  type="number"
                  fullWidth
                  value={baseSize}
                  onChange={this.handleChange('baseSize')}
                  margin="normal"
                  InputLabelProps={{
                    className: classes.textFieldLabel
                  }}
                />

                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                  InputLabelProps={{
                    className: classes.textFieldLabel
                  }}
                />

                <TextField
                  label="Density"
                  fullWidth
                  type="number"
                  value={density}
                  onChange={this.handleChange('density')}
                  margin="normal"
                  InputLabelProps={{
                    className: classes.textFieldLabel
                  }}
                />
              </div>

              <Divider light />

              <div className={classes.btnWrapper}>
                <Button
                  variant="contained"
                  className={classes.clearBtn}
                  onClick={this.handleClear}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.generateBtn}
                  onClick={this.handleGenerate}
                >
                  Generate
                </Button>
              </div>
            </div>

            <div className={classes.preview}>
              <Typography variant="h5" component="h3" className={classes.title}>
                Preview
              </Typography>

              <div className={classes.previewWrapper}>
                {isLoadingImage ? (
                  <PulseLoader sizeUnit={'px'} size={20} color={'#262a41'} />
                ) : (
                  <img
                    id="imgPreview"
                    className={classes.imgPreview}
                    title={imgTitle}
                    src={imgSource}
                    alt="Preview"
                  />
                )}
              </div>
            </div>
          </Paper>
        </div>
      </>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
