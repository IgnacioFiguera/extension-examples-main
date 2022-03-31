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

 import React, {useContext, useState, useEffect } from 'react'
 import { ExtensionContext2 } from '@looker/extension-sdk-react'
 import {
   Page,
   Form,
   Button,
   Text,
   FieldText,
   Fieldset,
   Divider,
   Box2,
   Space,
   Select,
   Heading,
   Grid,
   GridPlaceholder,
   Spinner,
   Popover,
   IconButton,
   ProgressCircular,
 } from '@looker/components'
 import { CalendarDay } from '@looker/icons'
 import {
  InputDate,
} from '@looker/components-date'
import i18n from 'i18next'
import { format } from 'date-fns';

export const IncidenciasEmbed = ({ embedType }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()))
  const [selectedDateFormated, setselectedDateFormated] = useState()
  const [cadenasO, setCadenasO] = useState()
  const [cadenasD, setCadenasD] = useState()
  const [tiendasO, setTiendasO] = useState()
  const [tiendasD, setTiendasD] = useState()
  const [progress, setProgress] = useState()
  const { coreSDK } = useContext(ExtensionContext2)

  const callLang = () => i18n.on("load")
  const handleDate = (date) => {
    setSelectedDate(date);
    setselectedDateFormated(format(date, 'dd-MM-yyyy'))
  }
  const GetCadenas = async () => {
    console.log("handleCadenas");
    try {

      const queryResponse = await coreSDK.ok(coreSDK.create_sql_query(
        {
          connection_name: 'piagui_connection',
          sql: 'SELECT * FROM `piagui-analitica.Desarrollo_Vistas_Piagui.Cat_Cadenas_Ventas`'
        }))
        const cadenas = await coreSDK.ok(coreSDK.run_sql_query(
          queryResponse.slug, 'json'))
          .then(
            (result) => {
              setCadenasO(
              result
              .map((data) => (
              {
                id: data.Cadena,
                value: data.Cadena,
                label: data.Cadena_DESC
              }
            )))

            setCadenasD(
              result
              .map((data) => (
              {
                id: data.Cadena,
                value: data.Cadena,
                label: data.Cadena_DESC
              }
            )))
        })
    } catch (error) {
      console.log(error)
      console.log('Failed to load look data')
    } finally {
    }
  }

  const runModel = () => {
    window.location.reload(false);
    setProgress(true)
  };

  useEffect(() => {
    setProgress(false)
    callLang();
    GetCadenas();
  }, []);

  const state = {
    selectedOption: null,
  };

  const handleCadenaOrigen = async (selectedOption) => {
    console.log(selectedOption)
    try {

      const queryResponse = await coreSDK.ok(coreSDK.create_sql_query(
        {
          connection_name: 'piagui_connection',
          sql: "SELECT * FROM `piagui-analitica.Desarrollo_Vistas_Piagui.Cat_Tiendas_Ventas` Where cadena = '" + selectedOption + "'"
        }))
        const cadenas = await coreSDK.ok(coreSDK.run_sql_query(
          queryResponse.slug, 'json'))
          .then(
            (result) => {
              console.log(result);
              setTiendasO(
              result
              .map((data) => (
              {
                id: data.Cadena,
                value: data.Tienda,
                label: data.Tienda
              }
            )))
        })
    } catch (error) {
      console.log(error)
      console.log('Failed to load look data')
    } finally {
    }
  };

  const handleCadenaDestino = async (selectedOption) => {
    console.log(selectedOption)
    try {

      const queryResponse = await coreSDK.ok(coreSDK.create_sql_query(
        {
          connection_name: 'piagui_connection',
          sql: "SELECT * FROM `piagui-analitica.Desarrollo_Vistas_Piagui.Cat_Tiendas_Ventas` Where cadena = '" + selectedOption + "'"
        }))
        const cadenas = await coreSDK.ok(coreSDK.run_sql_query(
          queryResponse.slug, 'json'))
          .then(
            (result) => {
              console.log(result);
              setTiendasD(
              result
              .map((data) => (
              {
                id: data.Cadena,
                value: data.Tienda,
                label: data.Tienda
              }
            )))
        })
    } catch (error) {
      console.log(error)
      console.log('Failed to load look data')
    } finally {
    }
  };

const handleTienda = (selectedOption) => {
  console.log(`Option selected:`, selectedOption)
};

const { selectedOption } = state;
  return (
    <Page height="100%">
      <Form>
      <Divider size="8px" customColor="white" mt="u5" borderRadius="100px" />
      <Grid columns={4}>
        <Box2 ml='u16'>
          <Fieldset display="inline-block" legend="Cambio de Formatos en Tiendas">
          </Fieldset>
        </Box2>
        <Box2 ml='u16'>
        </Box2>
        <Box2 ml='u16'>
        </Box2>
        <Box2 ml='u16'>
        </Box2>

        <Box2 ml='u16'>
          <Text>Origen</Text>
        </Box2>
        <Box2 ml='u16'>
        </Box2>
        <Box2 ml='u16'>
          <Text>Destino</Text>
        </Box2>
        <Box2 ml='u16'>
        </Box2>

        <Box2 ml='u16'>
          <label>Cadena</label>
        </Box2>
        <Box2 minWidth="200px">
          <Select
              placeholder="Cadenas"
              onChange={handleCadenaOrigen}
              options={cadenasO}
            />
        </Box2>
        <Box2 ml='u16'>
          <label>Cadena</label>
        </Box2>
        <Box2 minWidth="200px">
          <Select
              placeholder="Cadenas"
              onChange={handleCadenaDestino}
              options={cadenasD}
            />
        </Box2>

        <Box2 ml='u16'>
          <label>Tienda</label>
        </Box2>
        <Box2 minWidth="200px">
          <Select
              placeholder="Tiendas"
              onChange={handleTienda}
              options={tiendasO}
            />
        </Box2>
        <Box2 ml='u16'>
          <label>Tienda</label>
        </Box2>
        <Box2 minWidth="200px">
          <Select
              placeholder="Tiendas"
              options={tiendasD}
          />
        </Box2>


        <Box2 ml='u16'>
        </Box2>
        <Box2 ml='u16'>
        </Box2>
        <Box2 ml='u16'>
        <label>Mes Inicio</label>
        </Box2>
        <Box2 minWidth="200px">
          <Space gap="u15">
          <Popover
            content={
              <Box2 p="u3">
                <InputDate defaultValue={selectedDate} onChange={handleDate} />
              </Box2>
              }>
            <IconButton icon={<CalendarDay />} label="Calendar" />
          </Popover>
          <FieldText readOnly value={selectedDateFormated}></FieldText>
          </Space>
        </Box2>
        
        <Box2 ml='u8'>
        </Box2>
        <Box2 ml='u16'>
        </Box2>
        <Box2 ml='u16'>
          <Button onClick={runModel}>
                Ejecutar Modelo
          </Button>
        </Box2>
        <Box2 ml='u16'>
        </Box2>
        
      </Grid>
      <Space justifyContent="center">
        <ProgressCircular progress={progress} />
      </Space>
      </Form>
    </Page>
  )
}