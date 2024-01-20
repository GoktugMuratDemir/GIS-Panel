import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
//
import Typography from '@mui/material/Typography'
// import Image from '../image';

// ----------------------------------------------------------------------

export default function SingleFilePreview({ fileName = '' }) {
  // console.log("gelen single file :",fileName);
  return (
    <Box
      sx={{
        // p: 1,
        // top: 0,
        // left: 0,
        // width: 1,
        // height: 1,
        // position: 'absolute',
        width: 300,
        // height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent:"center"
      }}
    >
      {/* <Image
        alt="file preview"
        src={imgUrl}
        sx={{
          width: 1,
          height: 1,
          borderRadius: 1,
        }}
      /> */}
      <Typography variant="body1" color="initial">{fileName}</Typography>
    </Box>
  );
}

SingleFilePreview.propTypes = {
  fileName: PropTypes.string,
};
