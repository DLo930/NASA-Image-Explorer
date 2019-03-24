import React, { Component } from 'react';
import { css } from 'emotion';
import { FaTwitter, FaFacebook, FaLinkedin, FaPinterest } from 'react-icons/fa';
import { ShareButtonRectangle, ShareBlockStandard } from 'react-custom-share';

class ShareComponent extends Component {
  render() {
    const url = this.props.url_orig;
    const shareBlockProps = {
      url: url,
      button: ShareButtonRectangle,
      buttons: [
        { network: 'Twitter', icon: FaTwitter },
        { network: 'Facebook', icon: FaFacebook },
        { network: 'Linkedin', icon: FaLinkedin },
        { network: 'Pinterest', icon: FaPinterest, media: url },
      ],
      text: `${url}`,
      longtext: `Check out this inspiring image I found on the NASA Image Explorer!`,
    };

    return <ShareBlockStandard {...shareBlockProps} />;
  }
};

export default ShareComponent;
