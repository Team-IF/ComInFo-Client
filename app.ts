const PORT = 18382
import express from 'express'
const app = express()
import cors from 'cors'
import os from 'os'
// const gpuInfo = require('gpu-info')
import gpuInfo from '@jedithepro/system-info'

let cpuName = os.cpus()

const info = {
    hostname: os.hostname(),
    type: os.type(),
    platform: os.platform(),
    cpu: cpuName[0].model,
    ram: Math.floor(os.totalmem()),
    uptime: Math.floor(os.uptime()/60),
    gpu: ""
}

app.use(cors())

app.get('/', (_, res) => {
    // gpuInfo().then(data => { _Gpu = data
    //     info.gpu = _Gpu.map(x => x.Name).join('\n')
    //     res.send(info)
    // })

    gpuInfo.graphics().then(data => {
        // console.log(_Gpu.controllers.map(x => x.model).join('\n'))
        info.gpu = data.controllers.map(x => x.model).join('\n')
        res.send(info)
        
    }).catch(error => console.log(error))

    // info.gpu = _Gpu.map(x => x.Name).join('\n')

})

app.listen(PORT, () => console.log('Server is now on http://localhost:' + PORT))
