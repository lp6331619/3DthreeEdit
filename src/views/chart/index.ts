export const initData = [
  {
    id: 'id_vfos14wz2f400',
    isGroup: false,
    attr: {
      x: -66,
      y: 159,
      w: 500,
      h: 70,
      offsetX: 0,
      offsetY: 0,
      zIndex: -1,
      z: 0
    },
    styles: {
      filterShow: false,
      hueRotate: 0,
      saturate: 1,
      contrast: 1,
      brightness: 1,
      opacity: 1,
      rotateZ: 0,
      rotateX: 0,
      rotateY: 0,
      skewX: 0,
      skewY: 0,
      blendMode: 'normal',
      animations: []
    },
    preview: {
      overFlowHidden: true
    },
    status: {
      lock: false,
      hide: false
    },
    request: {
      requestDataType: 0,
      requestHttpType: 'get',
      requestUrl: '',
      requestIntervalUnit: 'second',
      requestContentType: 0,
      requestParamsBodyType: 'none',
      requestSQLContent: {
        sql: 'select * from  where'
      },
      requestParams: {
        Body: {
          'form-data': {},
          'x-www-form-urlencoded': {},
          json: '',
          xml: ''
        },
        Header: {},
        Params: {}
      }
    },
    events: {
      baseEvent: {},
      advancedEvents: {},
      interactEvents: []
    },
    key: 'id_vfos14wz2f400',
    chartConfig: {
      key: 'BoxGeometry',
      chartKey: 'VBoxGeometry',
      conKey: 'VCBoxGeometry',
      title: '立方缓冲几何体',
      category: 'Geometry',
      categoryName: '几何体',
      package: 'Graphic',
      chartFrame: 'common',
      image: 'BoxGeometry.png'
    },
    option: {
      position: [20, -9.806255791452191, -24.43359169745285],
      dataset: '',
      castShadow: true,
      scale: [1, 1, 1],
      rotation: [0, 0, 0, 'XYZ']
    },
    children: [
      {
        type: 'BoxGeometry',
        config: {
          args: [2, 2, 2]
        }
      },
      {
        config: {
          opacity: 1,
          visible: true,
          transparent: true,
          color: '#214A68',
          fog: true,
          wireframe: false
        },
        type: 'MeshToonMaterial'
      }
    ],
    type: 'TresMesh',
    name: '立方缓冲几何体',
    el: {
      metadata: {
        version: 4.6,
        type: 'Object',
        generator: 'Object3D.toJSON'
      },
      geometries: [
        {
          uuid: '00b82503-63bc-4d82-b35e-5dd814969550',
          type: 'BoxGeometry',
          width: 2,
          height: 2,
          depth: 2,
          widthSegments: 1,
          heightSegments: 1,
          depthSegments: 1
        }
      ],
      materials: [
        {
          uuid: '6a0874bd-9a5c-4ca0-976e-c331bdcbc94f',
          type: 'MeshToonMaterial',
          color: 2181736,
          emissive: 0,
          transparent: true,
          blendColor: 0
        }
      ],
      object: {
        uuid: 'dbd84a80-d223-4a11-916e-2db90f5f632f',
        type: 'Mesh',
        name: 'id_vfos14wz2f4000',
        castShadow: true,
        layers: 1,
        matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 20, 0, 6.156444439692759, 1],
        up: [0, 1, 0],
        geometry: '00b82503-63bc-4d82-b35e-5dd814969550',
        material: '6a0874bd-9a5c-4ca0-976e-c331bdcbc94f',
        children: [
          {
            uuid: '73960cac-2bc9-4f15-93ac-9bb02c5687b3',
            type: 'Object3D',
            name: ' 其他配置 ',
            layers: 1,
            matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            up: [0, 1, 0]
          }
        ]
      }
    }
  },
  {
    id: 'id_1o7yz91ohk6800',
    isGroup: false,
    attr: {
      x: 206,
      y: 65,
      w: 300,
      h: 150,
      offsetX: 0,
      offsetY: 0,
      zIndex: -1,
      z: 0
    },
    styles: {
      filterShow: false,
      hueRotate: 0,
      saturate: 1,
      contrast: 1,
      brightness: 1,
      opacity: 1,
      rotateZ: 0,
      rotateX: 0,
      rotateY: 0,
      skewX: 0,
      skewY: 0,
      blendMode: 'normal',
      animations: []
    },
    preview: {
      overFlowHidden: false
    },
    status: {
      lock: false,
      hide: false
    },
    request: {
      requestDataType: 0,
      requestHttpType: 'get',
      requestUrl: '',
      requestIntervalUnit: 'second',
      requestContentType: 0,
      requestParamsBodyType: 'none',
      requestSQLContent: {
        sql: 'select * from  where'
      },
      requestParams: {
        Body: {
          'form-data': {},
          'x-www-form-urlencoded': {},
          json: '',
          xml: ''
        },
        Header: {},
        Params: {}
      }
    },
    events: {
      baseEvent: {},
      advancedEvents: {},
      interactEvents: []
    },
    key: 'id_1o7yz91ohk680078',
    chartConfig: {
      key: 'Border01',
      chartKey: 'VBorder01',
      conKey: 'VCBorder01',
      title: '边框-01',
      category: 'Borders',
      categoryName: '边框',
      package: 'Decorates',
      chartFrame: 'static',
      image: 'border01.png'
    },
    option: {
      position: [9.850601632398545, 0, 10],
      dur: 0.5,
      colors: ['#4fd2dd', '#235fa7'],
      backgroundColor: '#000',
      link: '',
      linkHead: 'http://',
      dataset: '我是文本',
      fontSize: 20,
      fontColor: '#ffffff',
      paddingX: 10,
      paddingY: 10,
      textAlign: 'center',
      fontWeight: 'normal',
      letterSpacing: 5,
      writingMode: 'horizontal-tb'
    },
    type: 'Html',
    el: {
      metadata: {
        version: 4.6,
        type: 'Object',
        generator: 'Object3D.toJSON'
      },
      object: {
        uuid: '81261b2b-5f7e-48d5-a36e-894a8cf1dfee',
        type: 'Group',
        layers: 1,
        matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 9.850601632398545, 0, 10, 1],
        up: [0, 1, 0],
        children: [
          {
            uuid: '52a4c88d-dfea-4313-a52d-da2d0a8551bb',
            type: 'Group',
            layers: 1,
            matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            up: [0, 1, 0],
            children: [
              {
                uuid: '7c23ba28-5cd4-4cbd-9821-6d59ef74179c',
                type: 'Object3D',
                layers: 1,
                matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                up: [0, 1, 0]
              }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'id_20vldwy3vthc00',
    isGroup: false,
    attr: {
      x: 134,
      y: 269,
      w: 500,
      h: 70,
      offsetX: 0,
      offsetY: 0,
      zIndex: -1,
      z: 0
    },
    styles: {
      filterShow: false,
      hueRotate: 0,
      saturate: 1,
      contrast: 1,
      brightness: 1,
      opacity: 1,
      rotateZ: 0,
      rotateX: 0,
      rotateY: 0,
      skewX: 0,
      skewY: 0,
      blendMode: 'normal',
      animations: []
    },
    preview: {
      overFlowHidden: true
    },
    status: {
      lock: false,
      hide: false
    },
    request: {
      requestDataType: 0,
      requestHttpType: 'get',
      requestUrl: '',
      requestInterval: null,
      requestIntervalUnit: 'second',
      requestContentType: 0,
      requestParamsBodyType: 'none',
      requestSQLContent: {
        sql: 'select * from  where'
      },
      requestParams: {
        Body: {
          'form-data': {},
          'x-www-form-urlencoded': {},
          json: '',
          xml: ''
        },
        Header: {},
        Params: {}
      }
    },
    filter: null,
    events: {
      baseEvent: {
        click: null,
        dblclick: null,
        mouseenter: null,
        mouseleave: null
      },
      advancedEvents: {
        vnodeMounted: null,
        vnodeBeforeMount: null
      },
      interactEvents: []
    },
    key: 'BoxGeometry',
    chartConfig: {
      key: 'BoxGeometry',
      chartKey: 'VBoxGeometry',
      conKey: 'VCBoxGeometry',
      title: '立方缓冲几何体',
      category: 'Geometry',
      categoryName: '几何体',
      package: 'Graphic',
      chartFrame: 'common',
      image: 'BoxGeometry.png'
    },
    option: {
      dataset: '',
      position: [19.9999999999, -9.806255791552191, -24.433591697552853],
      castShadow: true
    },
    children: [
      {
        type: 'BoxGeometry',
        config: {
          args: [6, 2, 5]
        }
      },
      {
        config: {
          opacity: 1,
          visible: true,
          transparent: true,
          color: '#214A68',
          fog: true,
          wireframe: false
        },
        type: 'MeshToonMaterial'
      }
    ],
    type: 'TresMesh',
    name: '立方缓冲几何体'
  }
]
