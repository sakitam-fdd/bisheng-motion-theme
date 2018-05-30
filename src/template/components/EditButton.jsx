import React from 'react';
import { Tooltip, Icon } from 'antd';

const EditButton = function ({ title = '在 Github 上编辑此页！', filename, themeConfig }) {
  return (
    <Tooltip placement="top" title={title}>
      <a className="edit-button" href={`${themeConfig.repository}${filename}`} target="_blank">
        <Icon type="edit" />
      </a>
    </Tooltip>
  );
};

export default EditButton;
