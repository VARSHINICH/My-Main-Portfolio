import React from 'react';
import PropTypes from 'prop-types';
import {
  IconAppStore,
  IconAWSLogo,
  IconBookmark,
  IconCertificate,
  IconCodepen,
  IconEmail,
  IconExternal,
  IconFolder,
  IconFork,
  IconGCPLogo,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLoader,
  IconLogo,
  IconPlayStore,
  IconStar,
  IconTerraformLogo,
  IconTwitter,
} from '@components/icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'AppStore':
      return <IconAppStore />;
    case 'AWSLogo':
      return <IconAWSLogo />;
    case 'Bookmark':
      return <IconBookmark />;
    case 'Certificate':
      return <IconCertificate />;
    case 'Codepen':
      return <IconCodepen />;
    case 'Email':
      return <IconEmail />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GCPLogo':
      return <IconGCPLogo />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'Star':
      return <IconStar />;
    case 'TerraformLogo':
      return <IconTerraformLogo />;
    case 'Twitter':
      return <IconTwitter />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
