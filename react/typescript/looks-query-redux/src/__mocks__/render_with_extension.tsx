/*

 MIT License

 Copyright (c) 2022 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import type { ReactNode } from 'react'
import React from 'react'
import { renderWithTheme } from '@looker/components-test-utils'
import type { RenderResult } from '@testing-library/react'
import type {
  ExtensionContextData2,
  ExtensionContextData,
} from '@looker/extension-sdk-react'
import {
  ExtensionContext2,
  ExtensionContext,
  registerCore31SDK,
  registerCore40SDK,
  registerCoreSDK2,
  unregisterCore31SDK,
  unregisterCore40SDK,
  unregisterCoreSDK2,
} from '@looker/extension-sdk-react'
import type { ExtensionHostApi, ExtensionSDK } from '@looker/extension-sdk'
import { registerHostApi } from '@looker/extension-sdk'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '../data'

const store = configureStore()

const getExtensionSDK = (extensionSDKOverride: Partial<ExtensionSDK>) => {
  const extensionSDK = {
    lookerHostData: {},
    error: () => {
      // noop
    },
    ...extensionSDKOverride,
  } as ExtensionHostApi
  registerHostApi(extensionSDK)
  return extensionSDK
}

const getExtensionContext2 = (
  extensionSDKOverride: Partial<ExtensionSDK>,
  contextOverride: Partial<ExtensionContextData2<any>>
): ExtensionContextData2<any> => {
  const contextData = {
    extensionSDK: getExtensionSDK(extensionSDKOverride),
    coreSDK: {},
    route: '',
    ...contextOverride,
  } as ExtensionContextData2<any>
  unregisterCoreSDK2()
  registerCoreSDK2(contextData.coreSDK)
  return contextData
}

const withExtensionContext2 = (
  component: ReactNode,
  extensionSDKOverride: Partial<ExtensionSDK>,
  contextOverride: Partial<ExtensionContextData2<any>>
) => (
  <Provider store={store}>
    <MemoryRouter>
      <ExtensionContext2.Provider
        value={getExtensionContext2(extensionSDKOverride, contextOverride)}
      >
        {component}
      </ExtensionContext2.Provider>
    </MemoryRouter>
  </Provider>
)

export const renderWithExtensionContext2 = (
  component: ReactNode,
  extensionSDKOverride = {},
  contextOverride = {}
): RenderResult =>
  renderWithTheme(
    withExtensionContext2(component, extensionSDKOverride, contextOverride)
  )

const getExtensionContext = (
  extensionSDKOverride: Partial<ExtensionSDK>,
  contextOverride: Partial<ExtensionContextData>
): ExtensionContextData => {
  const contextData = {
    extensionSDK: getExtensionSDK(extensionSDKOverride),
    coreSDK: {},
    core31SDK: {},
    core40SDK: {},
    route: '',
    ...contextOverride,
  } as ExtensionContextData
  unregisterCore31SDK()
  unregisterCore40SDK()
  registerCore31SDK(contextData.core31SDK)
  registerCore40SDK(contextData.core40SDK)
  return contextData
}

const withExtensionContext = (
  component: ReactNode,
  extensionSDKOverride: Partial<ExtensionSDK>,
  contextOverride: Partial<ExtensionContextData>
) => (
  <Provider store={store}>
    <MemoryRouter>
      <ExtensionContext.Provider
        value={getExtensionContext(extensionSDKOverride, contextOverride)}
      >
        {component}
      </ExtensionContext.Provider>
    </MemoryRouter>
  </Provider>
)

export const renderWithExtensionContext = (
  component: ReactNode,
  extensionSDKOverride = {},
  contextOverride = {}
): RenderResult =>
  renderWithTheme(
    withExtensionContext(component, extensionSDKOverride, contextOverride)
  )
