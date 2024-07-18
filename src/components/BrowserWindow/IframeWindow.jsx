/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import BrowserWindow from './index';

// Componente simple, para mejorar más adelante si es necesario
export default function IframeWindow({ url }) {
  return (
    <div style={{ padding: 10 }}>
      <BrowserWindow
        url={url}
        style={{
          minWidth: 'min(100%,45vw)',
          width: 800,
          maxWidth: '100%',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <iframe
          src={url}
          title={url}
          style={{ display: 'block', width: '100%', height: 300 }}
        />
      </BrowserWindow>
    </div>
  );
}