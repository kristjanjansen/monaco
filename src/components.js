export const components = {
  "FActivityIcon": {
    "description": "\nActivity icon.\n  \n<f-activity-icon />\n\n<p />\n    ",
    "props": {
      "size": {
        "default": "medium",
        "description": "Icon size: `small` `medium` `large`"
      }
    },
    "template": "\n  <f-icon icon=\"activity\" :size=\"size\" />\n  "
  },
  "FAdvancedEditor": {
    "mixins": [{}],
    "props": ["value"],
    "methods": {},
    "template": "\n    <div>\n      <textarea ref=\"editor\" />\n    </div>\n  ",
    "cssprops": {
      "--advanced-editor-height": {
        "default": "auto",
        "description": "Advanced editor height"
      }
    },
    "css": "\n  .CodeMirror {\n    font-family: var(--font-mono);\n    font-size: var(--font-mono-size);\n    line-height: var(--font-mono-lineheight);\n    padding: var(--base2);\n    height: var(--advanced-editor-height) !important;\n    min-height: var(--advanced-editor-height) !important;\n  }\n  .CodeMirror-linenumber {\n    opacity: 0.2;\n    padding-right: var(--base);\n  }\n  .CodeMirror-line {\n    color: #87a0ab !important;\n  }\n  .CodeMirror .cm-header  {\n    color: #f0f3f5;\n    font-weight: normal;\n  }\n  .CodeMirror .cm-tag {\n    color: #58b2e9;\n  }\n  .CodeMirror .cm-strong {\n    font-weight: normal;\n    color: #f0f3f5;\n  }\n  .CodeMirror .cm-em {\n    color: #f0f3f5;\n  }\n  .CodeMirror .cm-strong.cm-em {\n    font-weight: normal;\n    font-style: normal;\n    color: var(--yellow);\n  }\n  "
  },
  "FAframe": {
    "mixins": [{}],
    "description": "\nA basic `a-scene` wrapper from [A-Frame](https://aframe.io/). Adds embedding, background color and look-based cursor. \n\n***Note*** A-Frame is not included in standard Fachwerk release. Add following lines to `index.html` to load A-Frame:\n\n    <script src=\"https://unpkg.com/aframe\"></script>\n    <script src=\"https://unpkg.com/aframe-rounded\"></script>\n\n<f-aframe>\n  <a-sphere position=\"0 0 -10\" />\n</f-aframe>\n  ",
    "props": {
      "width": { "default": 300, "type": [null, null] },
      "height": { "default": 300, "type": [null, null] },
      "backgroundColor": { "default": "#111" },
      "cursorColor": { "default": "#ddd" },
      "cursorTimeout": { "default": 700, "type": [null, null] },
      "embed": { "default": true },
      "shadow": {
        "default": "basic",
        "description": "`basic`, `pcf` or `pcfsoft`"
      }
    },
    "computed": {},
    "template": "\n    <a-scene shadow=\"'type: ' + type\" :embedded=\"embed\" :style=\"style\" class=\"f-aframe\">\n      <a-camera>\n        <a-cursor\n          :fuse=\"true\" \n          :fuse-timeout=\"cursorTimeout\"\n          :material=\"{color: cursorColor}\"\n          raycaster=\"objects: .clickable\"\n        />\n      </a-camera>\n      <a-sky :color=\"backgroundColor\"></a-sky>\n      <slot />\n    </a-scene>\n  ",
    "css": "\n    .f-aframe + * {\n      margin-top: var(--base2);\n    }\n  "
  },
  "FAframeButton": {
    "description": "\nA VR button that is triggered by looking at it.\n\n<f-aframe>\n\t<f-aframe-button\n    position=\"0 2 -3\"\n    title=\"Look\"\n    v-on:click.native=\"set('move',1 - get('move',1))\"\n  />\n  <a-sphere\n    :position=\"join(0,0,get('move',1) ? -5 : -10)\"\n  />\n</f-aframe>\n  ",
    "props": {
      "title": { "default": "" },
      "titleColor": { "default": "#333" },
      "backgroundColor": { "default": "#ddd" },
      "cursorTimeout": { "default": 700, "type": [null, null] },
      "position": { "default": "0 0 0" },
      "rotation": { "default": "0 0 0" }
    },
    "computed": {},
    "methods": {},
    "template": "\n  <a-entity\n    :position=\"position\"\n    :rotation=\"rotation\"\n  >\n    <a-entity\n      scale=\"0.5 0.5 0.5\"\n    >\n      <a-rounded\n        radius=\"0.06\"\n        :width=\"width\"\n        :position=\"width / -2 + ' 0 0'\"\n        :material=\"{shader: 'flat'}\"\n        :color=\"backgroundColor\"\n        class=\"clickable\"\n        @mouseenter.prevent=\"focus = true;\"\n        @mouseleave.prevent=\"focus = false; active = false\"\n        @click.prevent=\"active = true\"\n      />\n      <a-text\n        :position=\"x + ' 0.5 0'\"\n        :value=\"title\"\n        :color=\"titleColor\"\n        width=\"7\"\n      />\n      <f-animation\n        :playing=\"focus && !active\"\n        :reset=\"true\"\n        :from=\"0\"\n        :to=\"width - 0.2\"\n        :duration=\"cursorTimeout\"\n      >\n        <a-rounded\n          slot-scope=\"{ value }\"\n          radius=\"0.02\"\n          :width=\"value\"\n          height=\"0.1\"\n          :position=\"(width / -2 + 0.1) + ' 0.05 0.1'\"\n          :material=\"{shader: 'flat'}\"\n          color=\"#777\"\n        />\n      </f-animation>\n    </a-entity>\n  </a-entity>\n  "
  },
  "FAnimation": {
    "description": "\nAn animation component, based on [AnimeJS](https://github.com/juliangarnier/anime) library. Supports most of the animation options AnimeJS provides.\n\n### Simplest usage\n\nProvide a `set` prop to set a global variable:\n\n    <f-animation set=\"a\" />\n\n<f-animation set=\"a\" />\n\nand `get` it with utility function:\n\n <pre v-pre>{{ get('a') }}</pre>\n\nOutput: \n\n<output>a value: {{ get('a') }}</output>\n\n### Integer value\n\nTo get the integer value, set `integer` prop:\n\n    <f-animation set=\"b\" integer />\n\n<f-animation set=\"b\" integer />\n\n<output>b value: {{ get('b') }}</output>\n\n\n### Local data\n\nIn some cases you want animation value to be available to its children components only. You can use the following:\n\n    <f-animation v-slot=\"{ value: c }\">\n      <output>{{ c }}</output>\n    </f-animation>\n\n<f-animation v-slot=\"{ value: c }\">\n  <output>Local c value: {{ c }}</output>\n</f-animation>\n\n  ",
    "props": {
      "value": { "default": 0, "type": [null, null] },
      "from": { "default": 0, "type": [null, null] },
      "to": { "default": 360, "type": [null, null] },
      "duration": { "default": 10000, "type": [null, null] },
      "delay": { "default": 0, "type": [null, null] },
      "playing": { "default": true },
      "reset": { "default": false },
      "loop": { "default": true },
      "alternate": { "default": false },
      "easing": {
        "default": "linear",
        "description": "See [easing functions](https://github.com/juliangarnier/anime/tree/v2.2.0#easing-functions)"
      },
      "integer": { "default": false },
      "elasticity": {
        "default": 0.5,
        "type": [null, null],
        "description": "Set elasticity from `0` to `1` when using elastic easings"
      },
      "set": { "default": "", "description": "Name for global value to set" }
    },
    "slots": {
      "value": { "type": "number", "description": "Gets animation value" }
    }
  },
  "FArc": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nDraws and arc from `start-angle` to `end-angle` and it supports lot of different props for customizing the arc.\n\nTechnically the component is based on [d3.arc](https://github.com/d3/d3-shape#arcs).\n\n<f-scene grid>\n\t<f-arc />\n  <f-arc\n    r=\"1\"\n    inner-radius=\"0.5\"\n    start-angle=\"180\"\n    end-angle=\"360\"\n    pad-angle=\"10\"\n    corner-radius=\"0.1\"\n    :stroke=\"color('red')\"\n  />\n</f-scene>\n  ",
    "props": {
      "x1": { "default": 0, "type": [null, null] },
      "y1": { "default": 0, "type": [null, null] },
      "x2": { "default": 0, "type": [null, null] },
      "y2": { "default": 0, "type": [null, null] },
      "startAngle": { "default": 0, "type": [null, null] },
      "endAngle": { "default": 180, "type": [null, null] },
      "padAngle": { "default": 0, "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "innerRadius": { "default": 1, "type": [null, null] },
      "cornerRadius": { "default": 0, "type": [null, null] },
      "stroke": { "default": "var(--primary)" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "computed": {},
    "template": "\n    <path\n      :d=\"path\"\n      :fill=\"fill\"\n      :stroke=\"stroke\"\n      :stroke-width=\"currentStrokeWidth\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n    />\n  "
  },
  "FArray": {
    "description": "\nProvides an array of values and an update function.\n\n<f-array v-slot=\"{ value, update }\">\n  <f-scene>\n    <f-circle\n      :fill=\"value[0] ? color('gray') : color('red')\"\n      @click.native=\"update(1 - value[0], 0)\"\n    />\n  </f-scene>\n</f-array>\n  ",
    "props": {
      "length": { "default": 1, "type": [null, null] },
      "dimensions": { "default": 1, "type": [null, null] },
      "map": {}
    },
    "slots": {
      "value": { "type": "array", "description": "Gets array values" },
      "update": {
        "type": "function",
        "description": "Updates an element in and array, `update(index, value)`"
      }
    },
    "methods": {},
    "computed": {},
    "template": "\n  <div>\n    <slot :value=\"value\" :update=\"onUpdate\" /> \n  </div>\n  "
  },
  "FArrowIcon": {
    "description": "\nArrow icon.\n  \n<f-arrow-icon />\n\n<p />\n  ",
    "props": {
      "rotation": { "default": 0, "type": [null, null] },
      "description": "Rotation angle in degrees"
    },
    "template": "\n  <f-artboard :width=\"size\" :height=\"size\">\n    <f-group\n      :transform=\"'rotate(' + rotation + ')'\"\n      :transform-origin=\"[size / 2, size / 2].join(' ')\"\n    >\n      <f-line\n        :x1=\"2\"\n        :y1=\"size / 2\"\n        :x2=\"size - 3\"\n        :y2=\"size / 2\"\n        stroke=\"var(--icon-stroke)\"\n        stroke-width=\"2\"\n      />\n      <f-line\n        :points=\"[[size / 2,2],[size - 2,size/2],[size / 2,size - 2]]\"\n        stroke=\"var(--icon-stroke)\"\n        stroke-width=\"2\"\n      />\n    </f-group>\n    <slot :size=\"size\" />\n  </f-artboard>\n  "
  },
  "FArtboard": {
    "description": "\nA playground for generative vector graphics. Compared to the `<f-scene>` it is a standard `svg` document so the coordinate system and sizing is working in the expected way.\n\n<f-artboard width=\"400\" height=\"400\" grid>\n  <f-circle\n    v-for=\"(r,i) in range(0,300,10).reverse()\"\n    :key=\"i\"\n    x=\"200\"\n    y=\"200\"\n    :r=\"r\"\n    :fill=\"hsl(r)\"\n  />\n</f-artboard>\n  ",
    "props": {
      "width": { "default": 600, "type": [null, null] },
      "height": { "default": 600, "type": [null, null] },
      "grid": { "default": false },
      "dots": { "default": false },
      "step": { "default": 25, "type": [null, null] },
      "responsive": { "default": false },
      "id": { "default": "" },
      "download": { "default": false }
    },
    "slots": {
      "mouse": {
        "type": "object",
        "description": "Mouse data as `mouse.x` `mouse.y` `mouse.pressed`"
      }
    },
    "template": "\n  <f-svg \n    :width=\"width\"\n    :height=\"height\"\n    class=\"f-artboard\"\n    v-slot=\"{ mouse }\"\n    :responsive=\"responsive\"\n    :id=\"id\"\n    :download=\"download\"\n  >\n    <f-group>\n      <f-basegrid \n        v-if=\"grid\"\n        :inner-width=\"width\"\n        :inner-height=\"height\"\n        :step=\"step\"\n      />\n      <f-dots \n        v-if=\"dots\"\n        :inner-width=\"width\"\n        :inner-height=\"height\"\n        :step=\"step\"\n      />\n      <slot :mouse=\"mouse\" />\n    </f-group>\n  </f-svg>\n  "
  },
  "FAxis": {
    "description": "\nDisplays `x y` axis.\n\n<f-scene grid>\n  <f-axis />\n</f-scene>\n  ",
    "props": { "innerWidth": { "default": 2, "type": [null, null] } },
    "methods": {},
    "template": "\n    <f-group>\n      <f-line\n        :points=\"[[0,0],[innerWidth,0]]\"\n        :stroke=\"color('red')\"\n        stroke-width=\"2\"\n        opacity=\"0.75\"\n      />\n      <f-line\n        :points=\"[[0,0],[-innerWidth,0]]\"\n        :stroke=\"color('red')\"\n        stroke-width=\"2\"\n        opacity=\"0.2\"\n      />\n      <f-line\n        :points=\"[[0,0],[0,innerWidth]]\"\n        :stroke=\"color('green')\"\n        stroke-width=\"2\"\n        opacity=\"0.75\"\n      />\n      <f-line\n        :points=\"[[0,0],[0,-innerWidth]]\"\n        :stroke=\"color('green')\"\n        stroke-width=\"2\"\n        opacity=\"0.2\"\n      />\n    </f-group>\n  "
  },
  "FAxis3": {
    "description": "\nDisplays `x y z` axis.\n  \n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-axis3 />\n  </f-rotation3>\n</f-scene3>\n  ",
    "props": { "innerWidth": { "default": 2, "type": [null, null] } },
    "methods": {},
    "template": "\n    <f-group3>\n      <f-line3\n        :points=\"[[0,0,0],[innerWidth,0,0]]\"\n        :stroke=\"color('red')\"\n        stroke-width=\"2\"\n        opacity=\"0.75\"\n      />\n      <f-line3\n        :points=\"[[0,0,0],[-innerWidth,0,0]]\"\n        :stroke=\"color('red')\"\n        stroke-width=\"2\"\n        opacity=\"0.3\"\n      />\n      \n      <f-line3\n      :points=\"[[0,0,0],[0,innerWidth,0]]\"\n        :stroke=\"color('green')\"\n        stroke-width=\"2\"\n        opacity=\"0.75\"\n      />\n      <f-line3\n        :points=\"[[0,0,0],[0,-innerWidth,0]]\"\n        :stroke=\"color('green')\"\n        stroke-width=\"2\"\n        opacity=\"0.3\"\n      />\n      <f-line3\n        :points=\"[[0,0,0],[0,0,-innerWidth]]\"\n        :stroke=\"color('blue')\"\n        stroke-width=\"2\"\n        opacity=\"0.75\"\n      />\n      <f-line3\n        :points=\"[[0,0,0],[0,0,-innerWidth]]\"\n        :stroke=\"color('blue')\"\n        stroke-width=\"2\"\n        opacity=\"0.5\"\n      />    \n    </f-group3>\n  "
  },
  "FBasegrid": {
    "props": {
      "innerX": { "default": 0, "type": [null, null] },
      "innerY": { "default": 0, "type": [null, null] },
      "innerWidth": { "default": 300, "type": [null, null] },
      "innerHeight": { "default": 300, "type": [null, null] },
      "step": { "default": 25, "type": [null, null] },
      "opacity": { "default": 0.25, "type": [null, null] }
    },
    "methods": {},
    "template": "\n    <f-group>\n      <f-line\n        :x1=\"0\"\n        :y1=\"innerY\"\n        :x2=\"0\"\n        :y2=\"innerY + innerHeight\"\n        :stroke=\"color('primary')\"\n        :stroke-width=\"1\"\n        :opacity=\"opacity * 1.25\"\n      />\n      <f-line\n        :x1=\"innerX\"\n        :y1=\"0\"\n        :x2=\"innerX + innerWidth\"\n        :y2=\"0\"\n        :stroke=\"color('primary')\"\n        :stroke-width=\"1\"\n        :opacity=\"opacity * 1.25\"\n      />\n      <f-line\n        v-for=\"(x,i) in range(innerX,innerX + innerWidth,step)\"\n        :key=\"'x' + i\"\n        :x1=\"x\"\n        :y1=\"innerY\"\n        :x2=\"x\"\n        :y2=\"innerY + innerHeight\"\n        :stroke=\"color('primary')\"\n        :stroke-width=\"1\"\n        :opacity=\"opacity\"\n      />\n      <f-line\n        v-for=\"(y,i) in range(innerY,innerY + innerHeight,step)\"\n        :key=\"'y' + i\"\n        :x1=\"innerX\"\n        :y1=\"y\"\n        :x2=\"innerX + innerWidth\"\n        :y2=\"y\"\n        :stroke=\"color('primary')\"\n        :stroke-width=\"1\"\n        :opacity=\"opacity\"\n      />\n    </f-group>\n  "
  },
  "FBounce": {
    "mixins": [{}],
    "description": "\nBounce transition\n\n<f-buttons :buttons=\"['On', 'Off']\">\n  <h3 slot-scope=\"data\">\n    <f-bounce v-if=\"!data.value\">Bounce like a butterfly</f-bounce>\n  </h3>\n</f-buttons>  \n  ",
    "template": "\n  <transition appear name=\"bounce\">\n    <div><slot /></div>\n  </transition>\n  ",
    "css": "\n  .bounce-enter-active {\n    animation: bounce-in var(--transition-duration);\n  }\n  .bounce-leave-active {\n    animation: bounce-in var(--transition-duration) reverse;\n  }\n  .bounce-enter, .bounce-leave-to {\n    transform: scale(0);\n  }\n  \n  @keyframes bounce-in {\n    0% {\n      transform: scale(0);\n    }\n    50% {\n      transform: scale(1.2);\n    }\n    100% {\n      transform: scale(1);\n    }\n  }\n  \n  "
  },
  "FBox": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nDisplays a 2D rectangle.\n\n<f-scene grid>\n  <f-box />\n  <f-box\n    points=\"-1 0, 0 0, 1 0\"\n    r=\"0.25\"\n    :stroke=\"color('red')\"\n  />\n</f-scene>\n  ",
    "props": {
      "x": { "default": 0, "type": [null, null] },
      "y": { "default": 0, "type": [null, null] },
      "points": { "default": "", "type": [null, null, null, null] },
      "width": { "default": 1, "type": [null, null] },
      "height": { "default": 1, "type": [null, null] },
      "r": { "default": "", "type": [null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" },
      "position": { "default": "", "type": [null, null, null, null] },
      "rotation": { "default": "", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "multiply": { "default": false }
    },
    "computed": {},
    "template": "\n  <g>\n    <rect\n      v-if=\"currentPoints\"\n      v-for=\"p in currentPoints\"\n      :x=\"p[0] - ((r || width) / 2)\"\n      :y=\"p[1] - ((r || height) / 2)\"\n      :width=\"r || width\"\n      :height=\"r || height\"\n      :stroke=\"currentStrokeColor\"\n      :stroke-width=\"currentStrokeWidth\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n      :fill=\"fill\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n      :style=\"{ mixBlendMode: multiply ? 'multiply' : ''}\"\n    />\n    <rect\n      v-if=\"!currentPoints\"\n      :x=\"x - ((r || width) / 2)\"\n      :y=\"y - ((r || height) / 2)\"\n      :width=\"r || width\"\n      :height=\"r || height\"\n      :stroke=\"currentStrokeColor\"\n      :stroke-width=\"currentStrokeWidth\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n      :fill=\"fill\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n      :style=\"{ mixBlendMode: multiply ? 'multiply' : ''}\"\n    />\n  </g>\n  "
  },
  "FBox3": {
    "components": {
      "InternalBox3": {
        "mixins": [
          {
            "mixins": [
              {
                "inject": ["_baseUrl"],
                "props": { "baseUrl": {} },
                "methods": {},
                "template": "\n    <div><slot/></div>\n  "
              }
            ],
            "inject": ["parentObj"],
            "props": {
              "name": {},
              "type": { "default": "Object3D" },
              "obj": {},
              "scale": { "type": [null, null, null, null] },
              "position": { "type": [null, null, null] },
              "rotation": { "type": [null, null, null] }
            },
            "watch": {
              "scale": { "deep": true },
              "position": { "deep": true },
              "rotation": { "deep": true }
            },
            "methods": {}
          }
        ],
        "props": {
          "width": { "default": 1, "type": [null, null] },
          "height": { "default": 1, "type": [null, null] },
          "depth": { "default": 1, "type": [null, null] },
          "r": { "default": "", "type": [null, null] },
          "stroke": { "default": "" },
          "strokeWidth": { "default": 3, "type": [null, null] },
          "fill": { "default": "" },
          "scale": { "default": "1 1 1", "type": [null, null, null, null] },
          "position": { "default": "0 0 0", "type": [null, null, null, null] },
          "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
          "opacity": { "default": 1, "type": [null, null] },
          "shading": { "default": true }
        }
      }
    },
    "description": "\nDisplays a 3D box.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-box3 :stroke=\"color('red')\" fill />\n  </f-rotation3>\n</f-scene3>  \n  ",
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "props": {
      "width": { "default": 1, "type": [null, null] },
      "height": { "default": 1, "type": [null, null] },
      "depth": { "default": 1, "type": [null, null] },
      "r": { "default": "", "type": [null, null] },
      "stroke": { "default": "" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "color('primary')" },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "shading": { "default": true }
    },
    "computed": {},
    "template": "\n    <f-group3\n      :position=\"position\"\n      :rotation=\"rotation\"\n      :scale=\"scale\"\n    >\n      <f-group3 v-if=\"stroke\">\n        <f-line3\n          :points=\"frontfacePoints\"\n          :stroke=\"stroke\"\n          :stroke-with=\"strokeWidth\"\n        />\n        <f-line3\n          :points=\"backfacePoints\"\n          :stroke=\"stroke\"\n          :stroke-with=\"strokeWidth\"\n        />\n        <f-line3\n          v-for=\"(points,i) in connectorPoints\"\n          :key=\"i\"\n          :stroke=\"stroke\"\n          :points=\"points\"\n          :stroke-with=\"strokeWidth\"\n        />\n      </f-group3>\n      <InternalBox3\n        v-if=\"fill\" \n        :width=\"width\"\n        :height=\"height\"\n        :depth=\"depth\"\n        :r=\"r\"\n        :shading=\"shading\"\n        :fill=\"fill\"\n        :opacity=\"opacity\"\n      />\n    </f-group3>\n  "
  },
  "FBrickPattern": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nRepeats the contents in a shifted rectangular grid.\n\n<f-scene grid>\n  <f-group scale=\"0.5\">\n    <f-brick-pattern cols=\"3\" rows=\"3\" step=\"1\">\n      <f-box :stroke=\"color('red')\" />\n    </f-brick-pattern>\n    <f-box />\n  </f-group>\n</f-scene>\n  ",
    "props": {
      "rows": { "default": 3, "type": [null, null] },
      "cols": { "default": 3, "type": [null, null] },
      "width": {
        "default": "",
        "type": [null, null],
        "description": "***Depreciated*** Use `cols`"
      },
      "height": {
        "default": "",
        "type": [null, null],
        "description": "***Depreciated*** Use `rows`"
      },
      "step": { "default": 1, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "slots": {
      "row": {
        "type": "number",
        "description": "Current row of the repeated element, starting from `0`"
      },
      "col": {
        "type": "number",
        "description": "Current column of the repeated element, starting from `0`"
      }
    },
    "methods": {},
    "computed": {},
    "template": "\n  <f-group\n    :transform=\"transform\"\n    :opacity=\"opacity\"\n  >\n    <f-group :position=\"[(currentCols - 1) * step / -2, (currentRows - 1) * step / -2]\">\n      <f-group\n        v-for=\"(_, yIndex) in range(0, currentRows - 1)\"\n        :key=\"yIndex\"\n      >\n        <f-group\n          v-for=\"(_, xIndex) in range(0, yIndex % 2 ? currentCols : currentCols - 1)\"\n          :key=\"xIndex\"\n          :position=\"[xIndex * step - (yIndex % 2 ? step / 2 : 0), yIndex * step]\"\n        >\n          <slot\n            :col=\"xIndex\"\n            :row=\"yIndex\"\n            :index=\"(yIndex * cols) + xIndex\"\n          />\n        </f-group>\n      </f-group>\n    </f-group>\n  </f-group>  \n  "
  },
  "FBuffer": {
    "description": "\nStores an array of values as a sliding buffer. When adding value to the end of buffer, first value will be removed.\n\nInitially all buffer values are `0` but it can be adjusted with a `map` prop.\n\n#### Adding elements to the buffer\n\n<f-buffer length=\"3\" v-slot=\"{ value, add }\">\n  <button @click=\"add(1)\">Add 1 to buffer</button>\n  <button @click=\"add(2)\">Add 2 to buffer</button>\n  <p />\n  <pre>{{ value }}</pre>\n</f-buffer>\n\n#### Drawing with buffer\n\nBuffer can also be used for dynamic drawing, we can capture the mouse movements, add them to the buffer and loop over buffer values to draw the elements.\n\n<f-buffer length=\"10\" v-slot=\"{ value, add }\">\n  <f-scene grid v-slot=\"{ mouse }\">\n    <f-circle\n      v-for=\"(v,i) in value\"\n      :position=\"v\"\n      :opacity=\"scale(i,0,9,0,1)\"\n    />\n    <f-box\n      width=\"4\"\n      height=\"4\"\n      fill=\"rgba(0,0,0,0)\"\n      stroke\n      @mousemove.native=\"add(mouse)\"\n    />\n  </f-scene>\n</f-buffer>\n\nHere is the drawing workflow:\n\n1. Capture the mouse movements with the transparent rectangle, (see the `fill=\"rgba(0,0,0,0)\"`).\n\n2. Get mouse coordinates with `mouse` variable provided by the `f-scene` component.\n\n3. Add the coordinates to buffer with the function `add()` provided by the `f-buffer` component.\n\n4. Loop over the buffer `value`, drawing the elements with decreasing opacity, calculated with `scale` utility function. \n  ",
    "props": { "length": { "default": 1, "type": [null, null] }, "map": {} },
    "slots": {
      "value": { "type": "array", "description": "Gets buffer values" },
      "add": {
        "type": "function",
        "description": "Adds a value to the buffer, `add(value)`"
      }
    },
    "methods": {},
    "template": "\n  <div>\n    <slot :value=\"buffer\" :add=\"onAdd\" /> \n  </div>\n  "
  },
  "FButtons": {
    "description": "\nDisplays a group of buttons.\n\n<f-buttons\n  set=\"a\"\n  :buttons=\"['First','Second']\"\n/>\n\n    Index of selected button: {{ get('a', 0) }}  \n  ",
    "props": {
      "buttons": { "default": [] },
      "value": { "default": 0, "type": [null, null] },
      "set": {
        "default": "",
        "type": [null],
        "description": "Key for setting a global value"
      }
    },
    "methods": {},
    "template": "\n    <div :style=\"{display: 'flex', marginLeft: 'var(--border-width)', marginBottom: 'var(--base2)'}\">\n      <div\n        v-for=\"(button,i) in buttons\"\n        :key=\"i\"\n        @click=\"$emit('input',i); $emit('value',i); if (set) { setValue(set, i) }\"\n        :style=\"{\n          padding: '0.25rem 0.5rem',\n          border: 'var(--border-width) solid var(--primary)',\n          borderTopLeftRadius: i == 0 && 'var(--border-radius)',\n          borderBottomLeftRadius: i == 0 && 'var(--border-radius)',\n          borderTopRightRadius: i == buttons.length - 1 && 'var(--border-radius)',\n          borderBottomRightRadius: i == buttons.length - 1 && 'var(--border-radius)',\n          color: i === value ? 'var(--primary)' : 'var(--primary)',\n          fontWeight: 'bold',\n          fontSize: '0.9rem',\n          marginLeft: 'calc(var(--border-width) * -1)',\n          cursor: 'pointer',\n          background: isActive(i) ? 'var(--tertiary)' : 'none',\n        }\"\n        v-html=\"button\"\n      />\n    </div>\n  "
  },
  "FCanvas": {
    "description": "\nCreates a 2D bitmap canvas. Use `<f-pixel>` and `<f-pixels>` to draw on it.\n\n<f-canvas>\n</f-canvas>\n  ",
    "props": {
      "width": {
        "default": 300,
        "type": [null, null],
        "description": "Canvas width in pixels"
      },
      "height": {
        "default": 300,
        "type": [null, null],
        "description": "Canvas height in pixels"
      },
      "id": { "default": "" },
      "download": { "default": false }
    },
    "methods": {},
    "template": "\n  <div class=\"canvas\">\n    <canvas ref=\"canvas\" />\n    <slot />\n    <br />\n    <button v-if=\"download\" class=\"quaternary\" @click=\"onDownload\">⤓</button>\n  </div>\n"
  },
  "FCard": {
    "mixins": [{}],
    "description": "\nShows a card.\n\n<f-card>Some content here</f-card>\n\n<f-card\n  title=\"Title\"\n  subtitle=\"Subtitle\"\n  height=\"calc(var(--base) * 20)\"\n  color=\"var(--white)\"\n  background=\"var(--red)\"\n>\n  Some content here\n</f-card>\n\n<p />\n  ",
    "props": {
      "title": { "default": "" },
      "subtitle": { "default": "" },
      "background": { "default": "var(--emphasis)" },
      "color": { "default": "var(--primary)" },
      "border": { "default": "transparent" }
    },
    "template": "\n    <div\n      class=\"card\"\n      style=\"\n        border-radius: var(--border-radius);\n        padding: var(--base2);\n        height: 100%;\n        cursor: pointer;\n      \"\n      :style=\"{\n        color,\n        background,\n        border: 'var(--border-width) solid ' + border\n      }\"\n    >\n      <div style=\"\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n      \">\n        <h5\n          style=\"margin: 0;\"\n          :style=\"{ color }\"\n          v-html=\"title\"\n        />\n        <small\n          v-if=\"subtitle\"\n          :style=\"{ color }\"\n        >{{ subtitle }}</small>\n      </div>\n      <div class=\"card-content\">\n        <slot />\n      </div>\n    </div>\n    ",
    "css": "\n      .card-content > *:first-child {\n        margin-top: 0;\n      }\n      .card-content > *:last-child {\n        margin-bottom: 0;\n      }\n    "
  },
  "FCircle": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nDisplays a circle.\n\n<f-scene grid>\n  <f-circle />\n  <f-circle\n    points=\"-1 0, 0 0, 1 0\"\n    r=\"0.25\"\n    :stroke=\"color('red')\"\n  />\n</f-scene>  \n  ",
    "props": {
      "x": { "default": 0, "type": [null, null] },
      "y": { "default": 0, "type": [null, null] },
      "points": { "default": "", "type": [null, null, null, null] },
      "r": { "default": 1, "type": [null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "multiply": { "default": false }
    },
    "computed": {},
    "template": "\n    <f-group>\n    <circle\n      v-if=\"currentPoints\"\n      v-for=\"p,i in currentPoints\"\n      :key=\"i\"\n      :cx=\"p[0]\"\n      :cy=\"p[1]\"\n      :r=\"r\"\n      :stroke=\"currentStrokeColor\"\n      :stroke-width=\"currentStrokeWidth\"\n      :fill=\"fill\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n      :style=\"{ mixBlendMode: multiply ? 'multiply' : ''}\"\n    />\n    <circle\n      v-if=\"!currentPoints\"\n      :cx=\"x\"\n      :cy=\"y\"\n      :r=\"r\"\n      :stroke=\"currentStrokeColor\"\n      :stroke-width=\"currentStrokeWidth\"\n      :fill=\"fill\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n      :style=\"{ mixBlendMode: multiply ? 'multiply' : ''}\"\n    />\n    </f-group>\n  "
  },
  "FCircle3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nDisplays a 2D circle in 3D space\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-circle3 opacity=\"0.5\" />\n  </f-rotation3>\n</f-scene3>\n  ",
    "props": {
      "r": { "default": 1, "type": [null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "" },
      "position": {},
      "rotation": {},
      "scale": { "type": [null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "shading": { "default": true }
    },
    "computed": {},
    "template": "\n    <f-regularpolygon3\n      :r=\"r\"\n      :count=\"64\"\n      :stroke=\"strokeColor\"\n      :strokeWidth=\"strokeWidth\"\n      :fill=\"fill\"\n      :opacity=\"opacity\"\n    />\n  "
  },
  "FCirclePattern": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nRepeats elements along the circle.\n\n<f-scene grid>\n  <f-box />\n  <f-circle-pattern>\n    <f-box\n      slot-scope=\"data\"\n      :stroke=\"color('red')\"\n    />\n  </f-circle-pattern>\n</f-scene>\n  ",
    "props": {
      "count": { "default": 6, "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "methods": {},
    "template": "\n  <f-group\n    :transform=\"transform\"\n    :opacity=\"opacity\"\n  >\n    <f-group\n      v-for=\"(p,i) in polarpoints(count,r)\"\n      :key=\"i\"\n      :position=\"p\"\n    >\n      <slot :index=\"i\" />\n    </f-group>\n  </f-group>  \n  "
  },
  "FClockIcon": {
    "methods": {},
    "description": "\nClock icon.\n    \n<f-clock-icon\n  duration=\"15\"\n  duration2=\"30\"\n/>\n  \n<p />\n    ",
    "props": {
      "duration": { "default": 0, "type": [null, null] },
      "duration2": { "default": 0, "type": [null, null] }
    },
    "template": "\n  <f-scene width=\"20\" height=\"20\">\n    <f-circle r=\"1.7\" stroke fill=\"var(--icon-fill)\" />\n    <f-arc\n      rotation=\"180\"\n      scale=\"-1 1\"\n      r=\"1.7\"\n      inner-radius=\"0\"\n      start-angle=\"0\"\n      :end-angle=\"scale(duration2,0,60,0,360)\"\n      :fill=\"color('lightblue')\"\n      stroke\n    />\n    <f-arc\n      rotation=\"180\"\n      scale=\"-1 1\"\n      r=\"1.7\"\n      inner-radius=\"0\"\n      start-angle=\"0\"\n      :end-angle=\"scale(duration,0,60,0,360)\"\n      :fill=\"color('blue')\"\n      stroke\n    />\n    <f-circle r=\"1.7\" stroke-width=\"2\" stroke=\"var(--icon-stroke)\" />\n    <f-line rotation=\"0\" x1=\"0\" y1=\"1.7\" x2=\"0\" y2=\"1.5\" stroke-width=\"2\" stroke=\"var(--icon-stroke)\" />\n    <f-line rotation=\"0\" x1=\"0\" y1=\"-1.7\" x2=\"0\" y2=\"-1.5\" stroke-width=\"2\" stroke=\"var(--icon-stroke)\" />\n    <f-line rotation=\"90\" x1=\"0\" y1=\"1.7\" x2=\"0\" y2=\"1.5\" stroke-width=\"2\" stroke=\"var(--icon-stroke)\" />\n    <f-line rotation=\"90\" x1=\"0\" y1=\"-1.7\" x2=\"0\" y2=\"-1.5\" stroke-width=\"2\" stroke=\"var(--icon-stroke)\" />\n  </f-scene>\n"
  },
  "FCloseIcon": {
    "description": "\nClose icon.\n  \n<f-close-icon />\n\n<p />\n  ",
    "methods": {},
    "template": "\n  <f-artboard :width=\"size\" :height=\"size\">\n    <f-line\n      :x1=\"3\"\n      :y1=\"3\"\n      :x2=\"size - 3\"\n      :y2=\"size - 3\"\n      stroke=\"var(--icon-stroke)\"\n      stroke-width=\"2\"\n    />\n    <f-line\n      :x1=\"size - 3\"\n      :y1=\"3\"\n      :x2=\"3\"\n      :y2=\"size - 3\"\n      stroke=\"var(--icon-stroke)\"\n      stroke-width=\"2\"\n    />\n  </f-artboard>\n  "
  },
  "FColors": {
    "description": "\n\n<f-colors :colors=\"colors()\" />\n\n<p />\n  ",
    "props": {
      "value": { "default": -1, "type": [null, null] },
      "colors": { "default": [] },
      "r": { "default": 25, "type": [null, null] }
    },
    "methods": {},
    "template": "\n  <div style=\"display: flex; flex-wrap: wrap;\">\n    <f-scene v-for=\"(c,i) in colors\"\n      :width=\"r\"\n      :height=\"r\"\n      :key=\"i\"\n      :style=\"{\n        cursor: 'pointer',\n      }\"\n      @click.native=\"onClick(i)\"\n    >\n      <f-circle\n        v-if=\"currentValue == i\"\n        r=\"1.8\"\n        stroke-width=\"2\"\n        :stroke=\"color('primary')\"\n      />\n      <f-circle\n        r=\"1.5\"\n        :fill=\"color(c)\"\n        stroke\n      />\n    </f-scene>\n  </div>\n  "
  },
  "FContent": {
    "mixins": [{}],
    "props": {
      "content": { "default": "" },
      "type": { "default": "document" },
      "grid": { "default": false }
    },
    "computed": {},
    "methods": {},
    "template": "\n    <div>\n      <f-theme\n        v-if=\"type == 'slides' ? i == currentIndex : true\"\n        v-for=\"(slide,i) in currentContent\"\n        :key=\"i\"\n        :id=\"slide.section ? slug(slide.section) : 'id-' + i\"\n        :theme=\"slide.theme ? slide.theme : ''\"\n      ><div :style=\"{\n          ...backgroundStyle(slide),\n          justifyContent: 'center',\n          textAlign: 'center',\n      }\">\n        <div\n          class=\"cells\"\n          :style=\"{\n            ...gridStyle(slide),\n            ...cssStyle(slide),\n            textAlign: 'left',\n            margin: '0 auto',\n            padding: slide.padding ? slide.padding : 'var(--content-padding)',\n            maxWidth: type == 'document' ? 'var(--content-max-width)' : '100%',\n            minHeight: type == 'slides' ? '100vh' : slide.height ? slide.height : 'auto',\n        }\">\n          <f-markdown\n            v-for=\"(contentCell, j) in slide.content\"\n            :key=\"j\"\n            :content=\"contentCell\"\n            class=\"cell\"\n            :style=\"{\n              margin: grid ? '1px' : '',\n              border: grid ? '1px dashed var(--primary)' : '',\n              '--base': type == 'slides' ? '11px' : '8px',\n              gridArea: 'a' + (j + 1)\n            }\"\n          />\n        </div>\n          </div>\n      </f-theme>\n    </div>\n    ",
    "cssprops": {
      "--content-padding": {
        "default": "var(--base6)",
        "description": "Content padding"
      },
      "--content-max-width": {
        "default": "800px",
        "description": "Content max width in document mode"
      }
    },
    "css": "\n    section {\n      padding: var(--content-padding);\n      height: 100%;\n    }\n    center {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n      height: 100%;\n    }\n    .cells {\n      display: grid;\n    }\n    @media (max-width: 800px) {\n      .cells {\n        display: block;\n        padding: var(--content-padding) !important;\n      }\n    }\n    .cell *:only-child, .cell *:last-child {\n      margin-bottom: 0;\n    }\n    @media (max-width: 800px) {\n      .cell {\n        margin-top: calc(var(--base) + 5vw);\n      }\n      .cell:first-child {\n        margin-top: 0;\n      }\n    }\n    "
  },
  "FContentEditor": {
    "mixins": [{}],
    "props": {
      "content": { "default": "", "type": [null, null] },
      "edit": { "default": "hide" },
      "menu": { "default": "hide" },
      "type": { "default": "document" },
      "typebutton": { "default": "show" },
      "title": { "default": "Fachwerk" },
      "home": { "default": "" },
      "theme": { "default": "light" }
    },
    "methods": {},
    "computed": {},
    "template": "\n    <f-theme :theme=\"theme\" class=\"grid\" :style=\"{'--cols': currentEdit ? '1fr 1fr' : '1fr', '--gap': 0}\">\n      <div\n        v-if=\"currentEdit\"\n        class=\"editor\"\n      >\n        <f-editor-header v-model=\"currentContent\" :content=\"content\" :saveId=\"saveId\" />\n        <f-advanced-editor v-model=\"currentContent\" />\n      </div>\n      <div\n        class=\"grid\"\n        :style=\"{'--cols': currentMenu ? '250px 1fr' : '1fr', '--gap': 0}\"\n        style=\"position: relative;\"\n      >\n        <f-menu\n          v-if=\"currentMenu\"\n          :menu=\"currentMenu\"\n          :content=\"currentContent\"\n        />\n        <f-content\n          :type=\"currentType\"\n          :content=\"currentContent\"\n          :grid=\"grid\"\n        />\n        <f-content-header\n          :type=\"currentType\"\n          :typebutton=\"typebutton\"\n          :edit=\"currentEdit\"\n          :showEdit=\"showEdit\"\n          :menu=\"currentMenu\"\n          :showMenu=\"showMenu\"\n          :content=\"currentContent\"\n          :saveId=\"saveId\"\n          :home=\"home\"\n        />\n      </div>\n      <!--pre style=\"position: fixed; bottom: 0; right: var(--base2);\">\ncurrentEdit: {{ currentEdit }}\ncurrentMenu: {{ currentMenu }}\ncurrentType: {{ currentType }}\ngridStyle: {{ gridStyle }}</pre-->\n      <portal-target name=\"overlay\" style=\"z-index: 10000\" />\n      <f-keyboard alt character=\"e\" @keydown=\"currentEdit = !currentEdit\" />\n      <f-keyboard alt character=\"t\" @keydown=\"currentType = currentType == 'document' ? 'slides' : 'document'\" />\n      <f-keyboard v-if=\"currentEdit\" alt character=\"s\" @keydown=\"send('save')\" />\n      <f-keyboard alt character=\"left\" @keydown=\"send('prev')\" />\n      <f-keyboard alt character=\"right\" @keydown=\"send('next')\" />\n      <f-keyboard v-if=\"!currentEdit\" character=\"left\" @keydown=\"send('prev')\" />\n      <f-keyboard v-if=\"!currentEdit\" character=\"right\" @keydown=\"send('next')\" />\n      <f-keyboard alt character=\"g\" @keydown=\"grid = !grid\" />\n    </f-theme>\n    ",
    "css": "\n    .editor {\n      position: sticky;\n      top: 0;\n      height: 100vh;\n      --advanced-editor-height: calc(100vh - var(--base6));\n    }\n    @media (max-width: 800px) {\n      .editor {\n        position: static;\n        height: 50vh;\n        --advanced-editor-height: calc(50vh - var(--base6));\n      }\n    }\n    "
  },
  "FContentExample": {
    "props": { "src": { "default": "" } },
    "template": "\n  <f-fetch\n    :src=\"src\"\n    @value=\"content => currentContent = content\"\n    style=\"\n      margin: var(--base3) 0;\n    \"\n  >\n    <div class=\"grid\" style=\"\n      --cols: 1fr 1fr;\n      --gap: 0;\n      box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);\n      align-items: stretch;\n      border-radius: 2px;\n      overflow: hidden;\n    \">\n      <f-advanced-editor\n        v-model=\"currentContent\"\n        style=\"background: var(--paleblue)\"\n      />\n      <f-content\n        :content=\"currentContent\"\n        style=\"height: 100%; min-height: auto;\"\n      />\n      \n    </div>\n  </f-fetch>\n  "
  },
  "FContentHeader": {
    "props": {
      "content": { "default": "" },
      "edit": { "default": false, "type": [null, null] },
      "showEdit": { "default": true, "type": [null, null] },
      "menu": { "default": false, "type": [null, null] },
      "showMenu": { "default": true, "type": [null, null] },
      "type": { "default": "document" },
      "typebutton": { "default": "show" },
      "home": { "default": "" },
      "saveId": { "default": "fachwerk" }
    },
    "computed": {},
    "methods": {},
    "template": "\n    <div style=\"\n      position: absolute;\n      width: 100%;\n      height: var(--base6);\n      padding: 0 var(--base2);\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n    \">\n      <div>\n        <a\n          v-if=\"showEdit\"\n          class=\"quaternary\"\n          @click=\"$global.$emit('edit')\"\n          title=\"Edit content [alt + e]\"\n        >\n          <f-edit-icon :style=\"{\n            '--icon-stroke': edit ? 'var(--blue)' : ''}\n          \"/>\n        </a>\n        <a\n          v-if=\"home\"\n          class=\"quaternary\"\n          :href=\"home\"\n          style=\"margin-left: var(--base2)\"\n          title=\"Go back\"\n        >\n          <f-home-icon />\n        </a>\n        <a\n          v-if=\"showMenu && currentContent.filter(c => c.chapter || c.section).length\"\n          class=\"quaternary\"\n          @click=\"$global.$emit('menu')\"\n          title=\"Show menu [alt + m]\"\n        >\n          <f-menu-icon\n            :style=\"{\n              '--icon-stroke': menu ? 'var(--blue)' : '',\n            }\n          \"/>\n        </a>\n      </div>\n      <div style=\"display: flex\">\n        <div\n          v-if=\"type == 'slides' && currentContent.length > 1\"\n          style=\"display: flex;\"\n        >\n          <a class=\"quaternary\" style=\"padding: 0 4px\" @click=\"prev\" ><f-leftarrow-icon /></a>\n          <a class=\"quaternary\" style=\"padding: 0 4px\" @click=\"next\" ><f-rightarrow-icon /></a>\n        </div>\n        <a\n          v-if=\"typebutton == 'show'\"\n          :style=\"{ marginLeft: typebutton == 'show' ? 'var(--base2)' : ''}\"\n          class=\"quaternary\"\n          @click=\"$global.$emit('type', type == 'document' ? 'slides' : 'document')\"\n          :title=\"(type == 'document' ? 'Go to slide mode' : 'Go to document mode') + ' [alt + t]'\"\n        >\n          <component :is=\"iconComponent\" />\n        </a>\n      </div>\n    </div>\n    "
  },
  "FDocumentIcon": {
    "description": "\nDocument icon.\n  \n<f-document-icon />\n\n<p />\n  ",
    "template": "\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M14 4L11 1H2V15H14V4Z\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M10 1V5H14\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n  "
  },
  "FDots": {
    "props": {
      "innerX": { "default": 0, "type": [null, null] },
      "innerY": { "default": 0, "type": [null, null] },
      "innerWidth": { "default": 600, "type": [null, null] },
      "innerHeight": { "default": 600, "type": [null, null] },
      "step": { "default": 25, "type": [null, null] },
      "opacity": { "default": 0.5, "type": [null, null] }
    },
    "methods": {},
    "template": "\n  <f-group>\n    <f-group\n      v-for=\"(y,j) in range(innerY,innerY + innerHeight, step)\"\n      :key=\"j\"\n    >\n      <f-point\n        v-for=\"(x,i) in range(innerX,innerX + innerWidth, step)\"\n        :key=\"i\"\n        :position=\"[x,y]\"\n        :r=\"1\"\n        :opacity=\"opacity\"\n      />\n    </f-group>\n  </f-group>\n  ",
    "template2": "\n    <f-group>\n      <f-line\n        :x1=\"0\"\n        :y1=\"innerY\"\n        :x2=\"0\"\n        :y2=\"innerY + innerHeight\"\n        :stroke=\"color('primary')\"\n        :stroke-width=\"1\"\n        :opacity=\"opacity * 1.25\"\n      />\n      <f-line\n        :x1=\"innerX\"\n        :y1=\"0\"\n        :x2=\"innerX + innerWidth\"\n        :y2=\"0\"\n        :stroke=\"color('primary')\"\n        :stroke-width=\"1\"\n        :opacity=\"opacity * 1.25\"\n      />\n      <f-line\n        v-for=\"(x,i) in range(innerX,innerX + innerWidth,step)\"\n        :key=\"'x' + i\"\n        :x1=\"x\"\n        :y1=\"innerY\"\n        :x2=\"x\"\n        :y2=\"innerY + innerHeight\"\n        :stroke=\"color('primary')\"\n        :stroke-width=\"1\"\n        :opacity=\"opacity\"\n      />\n      <f-line\n        v-for=\"(y,i) in range(innerY,innerY + innerHeight,step)\"\n        :key=\"'y' + i\"\n        :x1=\"innerX\"\n        :y1=\"y\"\n        :x2=\"innerX + innerWidth\"\n        :y2=\"y\"\n        :stroke=\"color('primary')\"\n        :stroke-width=\"1\"\n        :opacity=\"opacity\"\n      />\n    </f-group>\n  "
  },
  "FDownloadIcon": {
    "description": "\nDownload icon.\n  \n<f-download-icon />\n\n<p />\n  ",
    "template": "\n  <f-arrow-icon rotation=\"90\" v-slot=\"{ size }\">\n  <f-line\n    x1=\"0\"\n    :y1=\"size - 1\"\n    :x2=\"size\"\n    :y2=\"size  - 1\"\n    stroke-width=\"2\"\n  />\n  </f-arrow-icon>\n  "
  },
  "FDrag": {
    "description": "\nAllows dragging a set of points.\n\n<f-scene grid v-slot=\"{ mouse }\" width=\"200\">\n  <f-drag\n    :mouse=\"mouse\"\n    points=\"-1 1, 1 1, 1 -1, -1 -1\"\n    v-slot=\"{ points }\"\n    set=\"p\"\n  >\n    <f-line :points=\"points\" closed />\n  </f-drag>\n</f-scene>\n\n<f-scene grid width=\"200\">\n\t<f-spin-pattern scale=\"0.5\" r=\"2\">\n\t\t<f-line :points=\"get('p')\" closed />\n  </f-spin-pattern>\n</f-scene>\n\n<pre>{{ get('p') }}</pre> \n  ",
    "props": {
      "points": { "default": "", "type": [null, null, null, null] },
      "mouse": {},
      "r": { "default": 10, "type": [null, null] },
      "step": { "default": false, "type": [null, null, null] },
      "set": { "default": "", "description": "Name for global value to set" }
    },
    "slots": {
      "points": {
        "type": "array",
        "description": "An array of points with each points as  `{ x: 0, y: 0 }` object"
      }
    },
    "methods": {},
    "computed": {},
    "template": "\n    <f-group>\n      <slot :points=\"finalPoints\" />\n      <f-group \n        v-for=\"(p,i) in finalPoints\"\n        :key=\"i\"\n      >\n        <f-point\n          :x=\"p.x\"\n          :y=\"p.y\"\n          :stroke=\"color('primary')\"\n          :stroke-width=\"p.pressed ? r + 1.5 : r\"\n        />  \n        <f-point \n          :x=\"p.x\"\n          :y=\"p.y\"\n          stroke=\"white\"\n          :stroke-width=\"p.pressed ? r + 1.5 - 3 : r - 3\"\n        />\n        <f-point \n          :x=\"p.x\"\n          :y=\"p.y\"\n          stroke=\"rgba(0,0,0,0)\"\n          :stroke-width=\"r * 2\"\n          @mousedown.native=\"handleDown(i)\"\n          @touchstart.native=\"handleDown(i)\"\n          @mouseup.native=\"handleUp(i)\"\n          @touchend.native=\"handleUp(i)\"\n          style=\"cursor: move;\"\n        />\n      </f-group>    \n    </f-group>\n  "
  },
  "FDrum": {
    "description": "\nSynthesizer emitting drum sounds.\n\n<f-drum v-slot=\"{ kick, snare, closedhihat, openhihat  }\">\n  <f-inline>\n    <button @mousedown=\"kick\">Kick</button>\n    <button @mousedown=\"snare\">Snare</button>\n    <button @mousedown=\"closedhihat\">Closed hihat</button>\n    <button @mousedown=\"openhihat\">Open hihat</button>\n  </f-inline>\n</f-drum>\n\n> This component needs extra installation to work. See **Making music** tutorial.\n\n",
    "methods": {},
    "template": "\n  <div>\n    <slot :kick=\"onKick\" :snare=\"onSnare\" :closedhihat=\"onClosedhihat\" :openhihat=\"onOpenhihat\" /> \n  </div>\n  "
  },
  "FDrumpad": {
    "description": "\nDisplays a drum pad.\n\n<f-drumpad />\n\nThere is also `sharps` prop that optionally displays sharp / flat notes.\n\n<f-drumpad sharps />\n\nDrum pad can also display highlighted keys.\n\n<f-drumpad notes=\"C4 E4 G4\" />\n\nAlso, it emits `noteon` and `noteoff` events so it can be used as a virtual keyboard to play notes.\n\n<f-synth v-slot=\"{ noteon, noteoff }\">\n  <f-drumpad\n    v-on:noteon=\"noteon\"\n    v-on:noteoff=\"noteoff\"\n  />\n</f-synth>\n\n<p />\n  ",
    "props": {
      "notes": {
        "default": "",
        "type": [null, null],
        "description": "List of active notes.<br>Examples: `\"C4 E4\"`, `\"C4,E4\"`, `\"['C4','E4']\"`"
      },
      "sharps": { "default": false, "description": "Show sharp / flat keys?" }
    },
    "methods": {},
    "computed": {},
    "template": "\n  <f-scene width=\"250\" height=\"250\">\n    <f-group\n      scale=\"0.97\"\n      v-for=\"(row,y) in chunk(currentNotes, 4)\"\n      :key=\"y\"\n    >\n      <f-box\n        v-for=\"(n, x) in row\"\n        :key=\"x\"\n        :x=\"scale(x,0,4-1,-1.5,1.5)\"\n        :y=\"scale(y,0,4-1,-1.5,1.5)\"\n        r=\"1\"\n        @mousedown.native=\"$emit('noteon', n.note)\"\n        @mouseup.native=\"$emit('noteoff', n.note)\"\n        @touchstart.native=\"$emit('noteon', n.note)\"\n        @touchend.native=\"$emit('noteoff', n.note)\"\n        :fill=\"noteFill(n)\"\n      />\n    </f-group>\n  </f-scene>\n  "
  },
  "FEditIcon": {
    "description": "\nEditor icon.\n  \n<f-editor-icon />\n\n<p />\n  ",
    "template": "\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M12 1L15 4L6 13L1 15L3 10L12 1Z\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M10 3L13 6\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n  "
  },
  "FEditor": {
    "tag": "Layout",
    "props": { "value": { "default": "", "type": [null, null] } },
    "description": "\nCreates a code editor, to be used with v-model.\n\n⌨️ Allows to enter two spaces using  <kbd>tab</kbd> key.\n\nTechnically it creates a `<textarea>` tag. For richer code editing experience, use `<f-markdown-editor>` instead.\n\n<f-editor v-model=\"someVariable\" />\n  ",
    "template": "\n    <textarea\n      ref=\"editor\"\n      v-model=\"content\"\n      @input=\"$emit('input', content)\"\n      style=\"\n        border: none;\n        color: var(--lightergray);\n        background: var(--paleblue);\n        font-family: var(--font-mono);\n        font-size: var(--font-mono-size);\n        line-height: var(--font-mono-lineheight);\n        outline: none;\n        resize: none;\n        width: 100%;\n        padding: var(--base2);\n      \"\n    />\n  "
  },
  "FEditorHeader": {
    "props": {
      "value": { "default": "" },
      "content": { "default": "" },
      "saveId": { "default": "fachwerk" }
    },
    "computed": {},
    "methods": {},
    "template": "\n    <div style=\"\n      height: var(--base6);\n      padding: 0 var(--base);\n      background: var(--paleblue);\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n    \">\n      <a\n        class=\"quaternary\"\n        @click=\"$global.$emit('edit')\"\n        title=\"Close editor\"\n      ><f-close-icon /></a>\n      <div>\n        <a\n          v-if=\"isRevertable && state !== 'reverted'\"\n          class=\"quaternary\"\n          style=\"opacity: 0.5\"\n          @click=\"handleRevert\"\n          title=\"Revert to original content\"\n        >Revert</a>\n        <a\n          class=\"quaternary\"\n          v-html=\"labels[state]\"\n          @click=\"handleSave\"\n          title=\"Save content [alt + s]\"\n        />\n      </div>\n    </div>\n    "
  },
  "FEmbed": {
    "description": "\nLoads content from Markdown file and show it inline.\n\nBelow is the content fetched from `../README.md`:\n\n<f-embed src=\"../README.md\" />\n",
    "props": { "src": { "default": "" } },
    "template": "\n  <f-fetch :src=\"src\" v-slot=\"{ value }\">\n    <f-content\n      :content=\"value\"\n      type=\"document\"\n      style=\"--content-padding: 0;\"\n    />\n  </f-fetch>\n  "
  },
  "FExternalIcon": {
    "description": "\nExternal icon.\n  \n<f-external-icon />\n\n<p />\n  ",
    "template": "\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M13 13V14C13.5523 14 14 13.5523 14 13H13ZM3 13H2C2 13.5523 2.44772 14 3 14V13ZM3 3V2C2.44772 2 2 2.44772 2 3H3ZM6 4C6.55228 4 7 3.55228 7 3C7 2.44772 6.55228 2 6 2V4ZM14 10C14 9.44772 13.5523 9 13 9C12.4477 9 12 9.44772 12 10H14ZM13 3H14C14 2.44772 13.5523 2 13 2V3ZM12 6.5C12 7.05228 12.4477 7.5 13 7.5C13.5523 7.5 14 7.05228 14 6.5H12ZM9.5 2C8.94772 2 8.5 2.44772 8.5 3C8.5 3.55228 8.94772 4 9.5 4V2ZM6.29289 8.29289C5.90237 8.68342 5.90237 9.31658 6.29289 9.70711C6.68342 10.0976 7.31658 10.0976 7.70711 9.70711L6.29289 8.29289ZM13 12H3V14H13V12ZM4 13V3H2V13H4ZM3 4H6V2H3V4ZM14 13V10H12V13H14ZM12 3V6.5H14V3H12ZM13 2H9.5V4H13V2ZM7.70711 9.70711L13.7071 3.70711L12.2929 2.29289L6.29289 8.29289L7.70711 9.70711Z\" fill=\"var(--icon-stroke)\"/>\n</svg>\n  "
  },
  "FExtrude3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nExtrudes the array of 2D `points` to the `z` dimension.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-extrude3\n      points=\"-1 -1, -1 1, 1 1, 1 -1, -1 -1\"\n    />\n  </f-rotation3>\n</f-scene3>\n  ",
    "props": {
      "points": { "default": "", "type": [null, null, null] },
      "length": { "default": 1, "type": [null, null] },
      "fill": { "default": "" },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "shading": { "default": true }
    },
    "computed": {},
    "methods": {},
    "template": "\n  <f-group3>\n    <f-group3 v-for=\"i in range(0, p.length - 2)\" :key=\"i\">\n      <f-triangle3\n        :points=\"[\n          [p[i][0],p[i][1],0],\n          [p[i + 1][0],p[i + 1][1],0],\n          [p[i + 1][0],p[i + 1][1],length],\n        ]\"\n        :shading=\"shading\"\n        :fill=\"fill\"\n      />\n      <f-triangle3\n        v-for=\"i in range(0, p.length - 2)\"\n        :key=\"'a' + i\"\n        :points=\"[\n          [p[i][0],p[i][1],0],\n          [p[i][0],p[i][1],length],\n          [p[i + 1][0],p[i + 1][1],length],\n        ]\"\n        :shading=\"shading\"\n        :fill=\"fill\"\n      />\n      <f-line3\n        v-for=\"i in range(0, p.length - 2)\"\n        :key=\"'b' + i\"\n        :points=\"[\n          [p[i][0],p[i][1],0],\n          [p[i + 1][0],p[i + 1][1],0],\n          [p[i + 1][0],p[i + 1][1],length],\n          [p[i][0],p[i][1],length],\n          [p[i][0],p[i][1],0]\n        ]\"\n      />\n    </f-group3>\n  </f-group3>\n  "
  },
  "FFactIcon": {
    "description": "\nFact icon.\n  \n<f-fact-icon />\n\n<p />\n    ",
    "props": {
      "size": {
        "default": "medium",
        "description": "Icon size: `small` `medium` `large`"
      }
    },
    "template": "\n  <f-icon icon=\"fact\" :size=\"size\" />\n  "
  },
  "FFade": {
    "mixins": [{}],
    "description": "\nFading transition\n\n<f-buttons :buttons=\"['On', 'Off']\">\n  <h3 slot-scope=\"data\">\n    <f-fade v-if=\"!data.value\">Fading like a flower</f-fade>\n  </h3>\n</f-buttons> \n\n<p />\n  ",
    "template": "\n  <transition appear name=\"fade\">\n    <div><slot /></div>\n  </transition>\n  ",
    "css": "\n  .fade-enter-active {\n    transition: all var(--transition-duration) ease-in;\n  }\n  .fade-leave-active {\n    transition: all var(--transition-duration) ease-out;\n  }\n  .fade-enter, .fade-leave-to {\n    opacity: 0;\n  }\n  "
  },
  "FFetch": {
    "description": "\nFetches data via AJAX.\n\n\n#### Fetching data from single local URL as text\n\n<f-fetch\n  src=\"../README.md\"\n  v-slot=\"{ value }\"\n>\n  <pre>{{ value.slice(0,100) }}</pre>\n</f-fetch>\n\n#### Fetching data from multple local URLs as text\n\n<f-fetch\n  :src=\"['../README.md','../RELEASES.md']\"\n  v-slot=\"{ value }\"\n>\n  <div>\n    <pre v-for=\"v in value\">{{ v.slice(0,100) }}...</pre>\n  </div>\n</f-fetch>\n\n#### Fetching data from remote URL as JSON\n\n<f-fetch\n  src=\"https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49\"\n  type=\"json\"\n  v-slot=\"{ value }\"\n>\n  <pre>{{ value.description }}</pre>\n</f-fetch>\n  ",
    "props": {
      "src": { "default": "", "type": [null, null] },
      "type": { "default": "text" }
    },
    "slots": {
      "value": {
        "type": "string",
        "description": "Fetched contents as a `string`, `array` or `object`. When `src` is an array of multiple URLs, `value` is an `array` of `string`s, `array`s or `object`s"
      }
    },
    "methods": {}
  },
  "FFooter": {
    "description": "\nDisplays a page footer.\n\n<f-footer />\n  \n<br>\n  ",
    "template": "\n  <div class=\"grid\" style=\"--cols: auto 1fr auto\">\n    <p style=\"opacity: 0.5\">\n      All code is licenced under <a href=\"https://choosealicense.com/licenses/mit/\" rel=\"licence\">MIT licence</a>.<br>All content is licenced under Creative Commons\n      <a rel=\"license\" href=\"https://creativecommons.org/licenses/by-nc-sa/4.0/\">BY-NC-SA 4.0</a> International License.\n    </p>\n    &nbsp;\n    <img src=\"https://designstem.github.io/fachwerk/images/erasmus_logo.svg\" style=\"width: 240px\" />\n  </div>\n  "
  },
  "FGithubIcon": {
    "description": "\nA Github icon.\n\n<f-github-icon />\n\n<p />\n  ",
    "props": { "url": { "default": "https://github.com/designstem/fachwerk" } },
    "template": "\n  <a :href=\"url\" style=\"border: none;\">\n    <svg\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        fill=\"var(--icon-stroke)\"\n        d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"\n      />\n    </svg>\n  </a>\n  "
  },
  "FGrid": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nDisplays a 2D rectangular grid.\n\nCompared to `<f-scene grid>` it allows allows greater freedom to generate custom grids using transformation parameters.\n\n<f-scene>\n  <f-grid />\n  <f-grid step=\"0.25\" />\n  <f-grid step=\"0.125\" />\n</f-scene>\n  ",
    "props": {
      "step": { "default": 0.5, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 0.2, "type": [null, null] }
    },
    "template": "\n  <f-group :transform=\"transform\">\n    <f-basegrid\n      :inner-x=\"-2\"\n      :inner-y=\"-2\"\n      :inner-width=\"4\"\n      :inner-height=\"4\"\n      :step=\"step\"\n      :opacity=\"opacity / 4\"\n    />\n    <f-basegrid\n      :inner-x=\"-2\"\n      :inner-y=\"-2\"\n      :inner-width=\"4\"\n      :inner-height=\"4\"\n      :step=\"step * 2\"\n      :opacity=\"opacity / 2\"\n    />\n    <f-basegrid\n      :inner-x=\"-2\"\n      :inner-y=\"-2\"\n      :inner-width=\"4\"\n      :inner-height=\"4\"\n      :step=\"step * 4\"\n      :opacity=\"opacity\"\n    />\n  </f-group>\n  "
  },
  "FGrid3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nDisplays a 3D rectangular grid.\n\nCompared to `<f-scene3 grid>` it allows allows greater freedom to generate custom grids using transformation parameters.\n  \n<f-scene3 grid>\n  <f-rotation3>\n    <f-grid3 position=\"-1 0 0\" scale=\"0.25\" />\n    <f-grid3 position=\"1 0 0\"  scale=\"0.25\" />\n  </f-rotation3>\n</f-scene3>\n  ",
    "props": {
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "opacity": { "default": 0.5, "type": [null, null] }
    },
    "methods": {},
    "template": "\n    <f-group3>\n    <f-group3\n      v-for=\"(rotation,i) in [[0,0,0],[90,0,0],[0,90,0]]\"\n      :key=\"i\"\n      :rotation=\"rotation\"\n    >\n    <f-line3\n      v-for=\"x,i in range(-2,2,1)\"\n      :key=\"'x' + i\"\n      :points=\"[{ x, y: -2},{ x, y: 2}]\"\n      :stroke-width=\"1\"\n      :opacity=\"x == 0 ? opacity * 1.25 : opacity\"\n    />\n    <f-line3\n      v-for=\"y,j in range(-2,2,1)\"\n      :key=\"'y' + j\"\n      :points=\"[{ x: -2, y },{ x: 2, y }]\"\n      :stroke-width=\"1\"\n      :opacity=\"y == 0 ? opacity * 1.25 : opacity\"\n    />\n    </f-group3>\n  </f-group3>\n  "
  },
  "FGridPattern": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nRepeats the contents in a 2D grid.\n\n<f-scene grid>\n  <f-group scale=\"0.5\">\n    <f-grid-pattern cols=\"3\" rows=\"3\" step=\"1\">\n      <f-box :stroke=\"color('red')\" />\n    </f-grid-pattern>\n    <f-box /> \n  </f-group> \n</f-scene>\n\n`f-grid-pattern` also provides slot variables `row` and `col` got get the current row and column of the repeating element:\n\n<f-scene grid>\n  <f-group scale=\"0.5\">\n    <f-grid-pattern cols=\"3\" rows=\"3\" step=\"1\"\n    \tv-slot=\"{ row, col }\"\n    >\n      <f-circle \n \t\t\t\tr=\"0.5\"\n    \t\t:fill=\"hsl(\n    \t\t\tscale(row,0,2,0,255),\n      \t\tscale(col,0,2,0,100)\n         )\"\n       />\n    </f-grid-pattern>\n  </f-group> \n</f-scene>\n  ",
    "props": {
      "rows": { "default": 3, "type": [null, null] },
      "cols": { "default": 3, "type": [null, null] },
      "width": { "default": "", "type": [null, null] },
      "height": { "default": "", "type": [null, null] },
      "step": { "default": 1, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "slots": {
      "row": {
        "type": "number",
        "description": "Current row of the repeated element, starting from `0`"
      },
      "col": {
        "type": "number",
        "description": "Current column of the repeated element, starting from `0`"
      }
    },
    "methods": {},
    "template": "\n  <f-group\n    :transform=\"transform\"\n    :opacity=\"opacity\"\n  >\n    <f-group :position=\"[(cols - 1) * step / -2,(rows - 1) * step / -2]\">\n      <f-group\n        v-for=\"(_, yIndex) in range(0, rows - 1)\"\n        :key=\"yIndex\"\n      >\n        <f-group\n          v-for=\"(_, xIndex) in range(0, cols - 1)\"\n          :key=\"xIndex\"\n          :position=\"[xIndex * step, yIndex * step]\"\n        >\n          <slot\n            :col=\"xIndex\"\n            :row=\"yIndex\"\n            :index=\"(yIndex * cols) + xIndex\"\n          />\n        </f-group>\n      </f-group>\n    </f-group>\n  </f-group>  \n  "
  },
  "FGridPattern3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nRepeats the contents in a 3D grid.\n\n<f-scene3 grid>\n  <f-group3 scale=\"0.5\">\n    <f-grid-pattern3 cols=\"3\" rows=\"3\" step=\"1\">\n      <f-box3 :stroke=\"color('red')\" fill />\n    </f-grid-pattern3>\n  </f-group3> \n</f-scene3>\n  ",
    "props": {
      "rows": { "default": 3, "type": [null, null] },
      "cols": { "default": 3, "type": [null, null] },
      "slices": { "default": 3, "type": [null, null] },
      "step": { "default": 1, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "slots": {
      "row": {
        "type": "number",
        "description": "Current row of the repeated element, starting from `0`"
      },
      "col": {
        "type": "number",
        "description": "Current column of the repeated element, starting from `0`"
      },
      "slice": {
        "type": "number",
        "description": "Current slice (along z-axis) of the repeated element, starting from `0`"
      }
    },
    "methods": {},
    "template": "\n  <f-group3\n    :opacity=\"opacity\"\n  >\n    <f-group3 :position=\"[(cols - 1) * step / -2,(rows - 1) * step / -2, (slices - 1) * step - 2]\">\n      <f-group3\n        v-for=\"(_, zIndex) in range(0, slices - 1)\"\n        :key=\"zIndex\"\n      >\n        <f-group3\n          v-for=\"(_, yIndex) in range(0, rows - 1)\"\n          :key=\"yIndex\"\n        >\n          <f-group3\n            v-for=\"(_, xIndex) in range(0, cols - 1)\"\n            :key=\"xIndex\"\n            :position=\"[xIndex * step, yIndex * step, zIndex * step]\"\n          >\n            <slot :col=\"xIndex\" :row=\"yIndex\" :slice=\"zIndex\" />\n          </f-group3>\n        </f-group3>\n      </f-group3>\n    </f-group3>\n  </f-group3>  \n  "
  },
  "FGroup": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nGroups child elements and applies 2D transformations to the group.\n\n<f-scene grid>\n  <f-group\n    position=\"1 1\"\n    rotation=\"45\"\n    scale=\"0.5\"\n  >\n    <f-box />\n  </f-group>\n</f-scene>\n  ",
    "props": {
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "template": "\n    <g :transform=\"transform\" :opacity=\"opacity\">\n      <slot />\n    </g>\n  "
  },
  "FGroup3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nGroups child elements and applies 3D transformations to the group.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-group3\n      position=\"1 1\"\n      rotation=\"45\"\n      scale=\"0.25\"\n    >\n      <f-box3 />\n    </f-group3>\n  </f-rotation3>\n</f-scene3>\n  ",
    "props": {
      "type": { "default": "Mesh" },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] }
    }
  },
  "FHamburgerIcon": {
    "description": "\nNavigation hamburger icon.\n  \n<f-hamburger-icon />\n\n<p />\n  ",
    "methods": {},
    "template": "\n  <f-artboard :width=\"size\" :height=\"size\">\n    <f-line\n      v-for=\"(y,i) in [3, size / 2, size - 3]\"\n      :key=\"i\"\n      :x1=\"2\"\n      :y1=\"y\"\n      :x2=\"size - 2\"\n      :y2=\"y\"\n      stroke=\"var(--icon-stroke)\"\n      stroke-width=\"2\"\n    />\n  </f-artboard>\n  "
  },
  "FHeader": {
    "description": "\nDisplays a page header, accepts `link` array for header links.\n\n<f-header :links=\"[{ title: 'Hello', src: '' }]\" />\n\n<br>\n\n",
    "props": { "links": { "default": "", "type": [null, null] } },
    "template": "\n  <header>\n    <div style=\"display: flex;\">\n      <div v-for=\"link in links\">\n        <a :href=\"link.src\">{{ link.title }}</a>&nbsp;&nbsp;&nbsp;\n      </div>\n    </div>\n  </header>\n  "
  },
  "FHedron3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nDisplays regular 3D hedron with optional `height` parameter.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-hedron3 shading height=\"1\" />\n  </f-rotation3>\n</f-scene3>\n  ",
    "methods": {},
    "props": {
      "count": { "default": 6, "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "height": { "default": 0, "type": [null, null] },
      "heightStrokeWidth": { "default": 0, "type": [null, null] },
      "stroke": { "default": "" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "color('primary')" },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "opacity": { "default": "", "type": [null, null] },
      "shading": { "default": true }
    },
    "computed": {},
    "template": "\n    <f-group3>\n      <f-triangle3\n        v-for=\"(p,i) in points\"\n        :key=\"'a' + i\"\n        :points=\"[\n          {x: p.x, y: p.y, z: 0},\n          {\n            x: points[i == points.length - 1 ? 0 : i + 1].x,\n            y: points[i == points.length - 1 ? 0 : i + 1].y,\n            z: 0\n          },\n          {x: 0, y: 0, z: 0}\n        ]\"\n        :fill=\"fill\"\n        :opacity=\"opacity || 1\"\n        :shading=\"shading\"\n      />   \n      <f-triangle3\n        v-for=\"(p,i) in points\"\n        :key=\"'b' + i\"\n        :points=\"[\n          {x: p.x, y: p.y, z: 0},\n          {\n            x: points[i == points.length - 1 ? 0 : i + 1].x,\n            y: points[i == points.length - 1 ? 0 : i + 1].y,\n            z: 0\n          },\n          {x: 0, y: 0, z: height}\n        ]\"\n        :fill=\"fill\"\n        :opacity=\"opacity || 1\"\n        :shading=\"shading\"\n      />\n      <f-line3\n        :points=\"points.concat(points[0])\"\n        :stroke=\"stroke\"\n        :strokeWidth=\"strokeWidth\"\n        :opacity=\"opacity || 1\"\n      />\n      <f-line3\n        v-if=\"heightStrokeWidth\"\n        v-for=\"p,i in points\"\n        :key=\"i\"\n        :points=\"[\n          {x: p.x, y: p.y, z: 0},\n          {x: 0, y: 0, z: height}\n        ]\"\n        :stroke=\"stroke\"\n        :strokeWidth=\"heightStrokeWidth\"\n        :opacity=\"opacity || 1\"\n      />\n      </f-group3>\n  "
  },
  "FHexPattern": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nRepeats the contents in a hexagonal grid.\n\n<f-scene grid>\n  <f-group scale=\"0.5\">\n    <f-hex-pattern cols=\"3\" rows=\"3\" step=\"1\">\n      <f-hexagon\n        :stroke=\"color('red')\"\n      />\n    </f-hex-pattern>\n    <f-hexagon />\n  </f-group>\n</f-scene>\n  ",
    "props": {
      "rows": { "default": 3, "type": [null, null] },
      "cols": { "default": 3, "type": [null, null] },
      "width": {
        "default": "",
        "type": [null, null],
        "description": "***Depreciated*** Use `cols`"
      },
      "height": {
        "default": "",
        "type": [null, null],
        "description": "***Depreciated*** Use `rows`"
      },
      "step": { "default": 1, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "slots": {
      "row": {
        "type": "number",
        "description": "Current row of the repeated element, starting from `0`"
      },
      "col": {
        "type": "number",
        "description": "Current column of the repeated element, starting from `0`"
      }
    },
    "methods": {},
    "computed": {},
    "template": "\n  <f-group\n    :transform=\"transform\"\n    :opacity=\"opacity\"\n  >\n    <f-group :position=\"[(currentCols - 1) * xStep / - 2,(currentRows - 1) * yStep / -2]\">\n      <f-group\n        v-for=\"(_, yIndex) in range(0, currentRows - 1)\"\n        :key=\"yIndex\"\n      >\n        <f-group\n          v-for=\"(_, xIndex) in range(0, yIndex % 2 ? currentCols : currentCols - 1)\"\n          :key=\"xIndex\"\n          :position=\"[\n            xIndex * xStep - (yIndex % 2 ? xStep / 2 : 0),\n            yIndex * yStep\n          ]\"\n        >\n          <slot :col=\"xIndex\" :row=\"yIndex\" />\n        </f-group>\n      </f-group>\n    </f-group>\n  </f-group>\n  "
  },
  "FHexagon": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nDisplays a hexagon.\n\n<f-scene grid>\n  <f-hexagon />\n  <f-hexagon\n    r=\"0.25\"\n    :stroke=\"color('red')\"\n  />\n</f-scene>\n  ",
    "props": {
      "x": { "default": "", "type": [null, null] },
      "y": { "default": "", "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "multiply": { "default": false }
    },
    "template": "\n    <f-regularpolygon\n      :x=\"x\"\n      :y=\"y\"\n      :r=\"r\"\n      :stroke=\"stroke\"\n      :stroke-width=\"strokeWidth\"\n      :fill=\"fill\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n      :scale=\"scale\"\n      :multiply=\"multiply\"\n    />\n  "
  },
  "FHomeIcon": {
    "description": "\nExternal icon.\n  \n<f-home-icon />\n\n<p />\n  ",
    "template": "\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M12 9V14H8H4V9H1L5 5L8 2L11 5L15 9H12Z\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\n  </svg>\n  "
  },
  "FHr": {
    "description": "\nHorizontal separator line\n\n<f-hr/>  \n  ",
    "template": "\n    <div style=\"\n      height: 0;\n      border-bottom: var(--border-width) solid var(--primary);\n      margin-bottom: var(--base2);\n    \">\n    &nbsp;\n    </div>\n  "
  },
  "FIcon": {
    "description": "\nVarious icons.\n\n<f-icon icon=\"fact\" />\n<f-icon icon=\"activity\" />\n<f-icon icon=\"note\" />\n<f-icon icon=\"vr\" />\n  ",
    "components": {
      "Fact": {
        "methods": {},
        "props": ["strokeWidth"],
        "template": "\n  <g>\n    <path d=\"M33.678,15.341a11,11,0,1,0-17,9.207v5.793a6,6,0,0,0,12,0V24.548A10.992,10.992,0,0,0,33.678,15.341Z\" :fill=\"color('primary')\" :stroke=\"color('primary')\" :stroke-width=\"strokeWidth\" />\n    <path d=\"M26.678,30.341a4,4,0,0,1-8,0V25.577a10.853,10.853,0,0,0,8,0Z\" :fill=\"color('lightblue')\" :stroke=\"color('primary')\" :stroke-width=\"strokeWidth / 2\" />\n    <path d=\"M23.678,24.282V18.013a1.5,1.5,0,0,0,.307-.364l.029-.05h0l1.634-2.831,1.634,2.83.014-.008a.985.985,0,0,0,.852.509,1,1,0,0,0,1-1A.973.973,0,0,0,29,16.607l.015-.008L26.948,13.02a1.5,1.5,0,0,0-2.6,0l-.028.05h0L22.686,15.9l-1.633-2.83h0l-.03-.05a1.5,1.5,0,0,0-1.3-.751h0a1.506,1.506,0,0,0-1.3.75L16.356,16.6h0l0,0,.012.007a.966.966,0,0,0-.146.489,1,1,0,0,0,1,1,.987.987,0,0,0,.85-.505l.017.009,1.634-2.83,1.633,2.83,0,0,.027.046a1.457,1.457,0,0,0,.291.352v6.282a9,9,0,1,1,2,0Z\" :fill=\"color('white')\" :stroke=\"color('primary')\" :stroke-width=\"strokeWidth / 2\"/>\n  </g>\n  "
      },
      "Activity": {
        "methods": {},
        "props": ["strokeWidth"],
        "template": "\n  <g>\n    <path d=\"M28.534,14.079a11.011,11.011,0,0,1,10,10.949h0a1,1,0,0,1-1,1H28.48a11.012,11.012,0,0,1-10.945,9.942h0a1,1,0,0,1-1-1h0V25.92a11.01,11.01,0,0,1-10-10.949h0a1,1,0,0,1,1-1h9.054A11.012,11.012,0,0,1,27.534,4.029h0a1,1,0,0,1,1,1h0\" :fill=\"color('primary')\" :stroke=\"color('primary')\" :stroke-width=\"strokeWidth\"/>\n    <!--green-->\n    <path d=\"M26.534,6.088v8.031a6.008,6.008,0,0,0-4.893,4.8,4,4,0,0,1-3.107-3.891A9.01,9.01,0,0,1,26.534,6.088Z\" :fill=\"color('white')\" :stroke=\"color('primary')\" :stroke-width=\"strokeWidth\"/>\n    <!--red-->\n    <path d=\"M36.475,24.029H28.444a6.008,6.008,0,0,0-4.8-4.893,4,4,0,0,1,3.89-3.107h0A9.009,9.009,0,0,1,36.475,24.029Z\" :fill=\"color('lightblue')\" :stroke=\"color('primary')\" :stroke-width=\"strokeWidth\"/>\n    <!--green-->\n    <path d=\"M18.534,33.912V25.881a6.011,6.011,0,0,0,4.885-4.746,4,4,0,0,1,3.113,3.875A9.008,9.008,0,0,1,18.534,33.912Z\" :fill=\"color('white')\" :stroke=\"color('primary')\" :stroke-width=\"strokeWidth\"/>\n    <!--red-->\n    <path d=\"M8.593,15.971h8.023a6.008,6.008,0,0,0,4.793,4.948,4,4,0,0,1-3.875,3.052A9.01,9.01,0,0,1,8.593,15.971Z\" :fill=\"color('lightblue')\" :stroke=\"color('primary')\" :stroke-width=\"strokeWidth\"/>\n  </g>\n"
      },
      "Note": {
        "methods": {},
        "props": ["strokeWidth"],
        "template": "\n  <g>\n    <path d=\"M23.768,29.117h0a.988.988,0,0,0-.85.5l-.016-.01-1.634,2.83-1.634-2.83,0,0-.028-.048a1.507,1.507,0,0,0-1.3-.748h0a1.506,1.506,0,0,0-1.3.75l-.029.05h0l-1.634,2.83-1.634-2.83-.013.008a.988.988,0,0,0-.852-.508,1,1,0,0,0-1,1h0a.975.975,0,0,0,.147.492l-.014.008L14.042,34.2a1.5,1.5,0,0,0,1.3.751h0a1.5,1.5,0,0,0,1.3-.75l.028-.049h0L18.3,31.318l1.634,2.831,0,0,.028.049a1.5,1.5,0,0,0,2.6,0l2.067-3.58h0l0,0-.011-.006a.975.975,0,0,0,.145-.489h0A1,1,0,0,0,23.768,29.117Z\" :fill=\"color('primary')\"/>\n    <path d=\"M32.3,6.806A6.005,6.005,0,0,0,23.826,6.8h0l-.354.354-9.909,9.909c-.2.2-.353.353-.353.353l.011.012a.971.971,0,0,0-.2.378l-.015,0L11.94,21.791a1.493,1.493,0,0,0,.029.846L11,26.272a1.5,1.5,0,0,0,1.451,1.887,1.48,1.48,0,0,0,.385-.05l3.623-.971a1.43,1.43,0,0,0,.856.031L21.3,26.1l0-.016a.989.989,0,0,0,.383-.2l.011.011.354-.353,9.908-9.909.345-.344h0l.009-.009h0A6.006,6.006,0,0,0,32.3,6.806Z\" :fill=\"color('primary')\"/>\n    <!--red-->\n    <polygon points=\"15.474 25.33 13.151 25.952 13.773 23.629 13.777 23.628 16.097 23.006 15.474 25.33\" :fill=\"color('white')\"/>\n    <!--green-->\n    <path d=\"M30.887,13.877l-.345.344L20.633,24.13l-.108.108-2.9.776.778-2.9.1-.1L29.117,11.4l.354-.353a1,1,0,0,0-1.414-1.414l-.354.353L17.1,20.593l-.1.1-2.9.777.774-2.893.107-.106,9.908-9.909.345-.344a4,4,0,1,1,5.657,5.657Z\" :fill=\"color('lightblue')\"/>\n  </g>\n  "
      },
      "Vr": {
        "methods": {},
        "props": ["strokeWidth"],
        "template": "\n  <g>\n    <g>\n      <path d=\"M34.312,22.642a6.007,6.007,0,0,0,0-8.483h0a5.982,5.982,0,0,0-5.131-1.67,10.939,10.939,0,0,0-4.358-1.744l1.542-2.672-1.732-1L23,9.9l-1.634-2.83-1.732,1,1.541,2.671a10.928,10.928,0,0,0-4.357,1.744,5.982,5.982,0,0,0-5.13,10.155h0c.128.128.276.222.412.336a10.989,10.989,0,0,0,21.8,0c.138-.115.286-.21.415-.339Z\" :fill=\"color('primary')\"/>\n      <path d=\"M23,12.581a8.928,8.928,0,0,1,3.746.828,6.007,6.007,0,0,0-.919.75h0a4.005,4.005,0,0,1-5.656,0h0a6.014,6.014,0,0,0-.919-.751A8.927,8.927,0,0,1,23,12.581Z\" :fill=\"color('white')\"/>\n      <path d=\"M23,30.581a9.013,9.013,0,0,1-8.616-6.41,5.976,5.976,0,0,0,5.788-1.527h0a4,4,0,0,1,5.656,0h0a5.98,5.98,0,0,0,5.786,1.528A9.014,9.014,0,0,1,23,30.581Z\" :fill=\"color('white')\"/>\n      <path d=\"M25.877,24.54c-.018.018-.024.043-.041.062l-.009-.009a4,4,0,0,1-5.657,0l-.006.006a.546.546,0,0,0-.039-.059,1,1,0,0,0-1.414,1.414c.017.018.041.024.059.04l-.014.013a6.005,6.005,0,0,0,8.485,0L27.229,26a.511.511,0,0,0,.062-.041,1,1,0,0,0-1.414-1.414Z\" :fill=\"color('primary')\"/>\n    </g>\n    <path d=\"M27.243,21.23h0a6.007,6.007,0,0,0-8.485,0h0a4,4,0,0,1-5.656,0h0a4,4,0,0,1,5.656-5.658h0a6.007,6.007,0,0,0,8.486,0h0a4,4,0,0,1,5.656,0h0a4,4,0,0,1,0,5.657l0,0A4.005,4.005,0,0,1,27.243,21.23Z\" :fill=\"color('lightblue')\" />\n  </g>\n  "
      }
    },
    "props": {
      "icon": { "default": "fact", "description": "Icon name" },
      "size": {
        "default": "medium",
        "description": "Icon size: `small`, `medium`, `large`"
      }
    },
    "computed": {},
    "template": "\n  <f-artboard\n    :width=\"sizes[size].width\"\n    :height=\"sizes[size].width\"\n  >\n    <f-group :position=\"[sizes[size].width / 2 , sizes[size].width / 2]\">\n      <f-roundedpolygon\n        stroke=\"var(--icon-stroke)\"\n        :stroke-width=\"sizes[size].strokeWidth / 20\"\n        corner-radius=\"0.5\"\n        :r=\"sizes[size].width / 2\"\n        fill=\"white\"\n      />\n    </f-group>\n    <component\n      :is=\"icon\"\n      :transform=\"transform\"\n      :stroke-width=\"sizes[size].innerStrokeWidth\"\n    />\n  </f-artboard>\n  ",
    "cssprops": {
      "--icon-stroke": {
        "default": "var(--primary)",
        "description": "Icon stroke color"
      },
      "--icon-fill": { "default": "var(--white)", "description": "Icon fill" }
    }
  },
  "FIconGithub": {
    "description": "\nA Github icon.\n\n<f-github-icon />\n\n<p />\n  ",
    "props": { "url": { "default": "https://github.com/designstem/fachwerk" } },
    "template": "\n  <a :href=\"url\" style=\"border: none;\">\n    <svg\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        fill=\"var(--icon-stroke)\"\n        d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"\n      />\n    </svg>\n  </a>\n  "
  },
  "FIconHeading": {
    "mixins": [{}],
    "description": "\nShows heading with an icon.\n\n<f-icon-heading size=\"small\">Some activity</f-icon-heading>\n\n<f-icon-heading size=\"medium\">Some activity</f-icon-heading>\n\n<f-icon-heading size=\"large\">Some activity</f-icon-heading>\n",
    "props": {
      "icon": { "default": "activity", "description": "Icon name" },
      "size": {
        "default": "medium",
        "description": "Header size: `small`, `medium`, `large`"
      }
    },
    "template": "\n  <div class=\"f-icon-heading\" style=\"display: flex; margin-bottom: var(--base2); align-items: flex-start;\">\n    <div style=\"margin-right: calc(var(--base) * 1.25);\">\n      <component\n        :is=\"'f-' + icon + '-icon'\" :size=\"size\"\n      />\n    </div>\n    <div>\n      <h2 v-if=\"size == 'large'\" style=\"margin: 1ch 0 0 0;\"><slot /></h2>\n      <h3 v-if=\"size == 'medium'\" style=\"margin: 0.7ch 0 0 0;;\"><slot /></h3>\n      <h4 v-if=\"size == 'small'\" style=\"margin: 0.3ch 0 0 0;;\"><slot /></h4>\n    </div>\n  </div>\n  ",
    "css": "\n    .f-icon-heading .f-svg {\n      display: block;\n    }\n  "
  },
  "FImage": {
    "mixins": [{}],
    "description": "\nDisplays an image.\n\n<f-image src=\"../images/example.jpg\" />\n  ",
    "props": { "src": { "default": "", "description": "Image URL" } },
    "template": "\n    <div \n      :style=\"{ \n        background: 'url(' + src + ')',\n        backgroundSize: 'var(--image-size)', \n        backgroundPosition: 'var(--image-position)', \n        backgroundRepeat: 'var(--image-repeat)',\n        height: 'var(--image-height)',\n        minHeight: 'var(--image-min-height)'\n      }\"\n      >&nbsp;</div>\n  ",
    "cssprops": {
      "--image-height": { "default": "100%", "description": "Image height" },
      "--image-min-height": {
        "default": "calc(var(--base) * 30)",
        "description": "Image minimum height"
      },
      "--image-size": {
        "default": "cover",
        "description": "Background size: `cover`, `contain` or other css `value`"
      },
      "--image-position": {
        "default": "center",
        "description": "Background position: `50% 75%`, `center bottom` or other css `value`"
      },
      "--image-repeat": {
        "default": "no-repeat",
        "description": "Background repeat: `repeat`, `repeat-x` or other css `value`"
      }
    }
  },
  "FInline": {
    "mixins": [{}],
    "description": "\n\nInline layout component based on [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Alignment/Box_Alignment_in_Flexbox\n).\n\n***Note*** This component will be renamed to `f-flex`. `f-inline` will likely stay but will support the simpler use case.\n\n<f-inline>\n  <button>Button 1</button>\n  <button>Button 2</button>\n</f-inline>\n\nBy setting CSS variables you can adjust how the contents is layed out:\n\n<f-inline style=\"\n\t--inline-gap: var(--base2);\n\t--inline-align: flex-start;\n\">\n<div><f-icon /></div>\n<div>\n\n### Hello world\n\nThe CSS align-items property sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.\n\n</div>\n</f-inline>\n\nYou can also use `<f-inline>` to justify content:\n\n<f-inline style=\"\n\t--inline-justify: space-between;\n\">\n  <f-icon />\n  <f-icon />\n  <f-icon />\n</f-inline>\n  ",
    "template": "\n  <div class=\"f-inline\">\n    <slot />\n  </div>\n  ",
    "cssprops": {
      "--inline-gap": {
        "default": "var(--base)",
        "description": "Gap between inline elements"
      },
      "--inline-justify": {
        "default": "start",
        "description": "Horizontal alignment on elements, use [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) values"
      },
      "--inline-align": {
        "default": "center",
        "description": "Vertical alignment on elements, use [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) values"
      }
    },
    "css": "\n  .f-inline {\n    display: flex;\n    justify-content: var(--inline-justify);\n    align-items: var(--inline-align);\n    margin-bottom: var(--base2);\n  }\n  .f-inline > * {\n    margin: 0 var(--inline-gap) 0 0 !important;\n  }\n  .f-inline > *:last-child {\n    margin: 0;\n  }\n  p .f-inline {\n    margin-bottom: var(--base2);\n  }\n  @media (max-width: 800px) {\n    .f-inline {\n      display: block;\n    }\n    .f-inline > * {\n      margin: 0 0 var(--base);\n    }\n  }\n  "
  },
  "FKeyboard": {
    "props": {
      "character": { "default": "a" },
      "alt": { "default": false, "type": [null, null] },
      "ctrl": { "default": false, "type": [null, null] }
    },
    "description": "\nListens keypresses and emits `v-on:keydown` and `v-on:keyup` events.\n\n<f-keyboard\n  ctrl\n  alt\n  character=\"a\"\n  v-on:keydown=\"set('keyboard', 1 - get('keyboard', 0))\"\n/>\n\nPress <kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>a</kbd>\n\n<h1 v-if=\"get('keyboard',0)\"><big>💥</big></h1>\n\n  ",
    "computed": {}
  },
  "FLathe3": {
    "description": "\nDisplays 3D lathe geometry.\n\n<f-scene3 webgl>\n  <f-rotation3>\n    <f-grid3 />\n    <f-lathe3\n      scale=\"0.5\"\n      count=\"12\"\n      :points=\"range(-Math.PI,Math.PI,0.25).map(y => [Math.sin(y),y])\"\n    />\n  </f-rotation3>\n</f-scene3>\n  ",
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "props": {
      "count": { "default": 12, "type": [null, null] },
      "points": { "default": "", "type": [null, null, null, null] },
      "fill": { "default": "color('primary')" },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "shading": { "default": true }
    }
  },
  "FLeftarrowIcon": {
    "description": "\nLeft arrow icon.\n  \n<f-leftarrow-icon />\n\n<p />\n  ",
    "template": "\n  <f-arrow-icon rotation=\"180\" />\n  "
  },
  "FLine": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nDisplays a straight, segmented or curved line.\n\n<f-scene grid>\n  <f-line\n  \tpoints=\"-0.5 1,-1 1,-1 0.5\"\n  />\n  <f-line\n  \tpoints=\"1 1,0.5 1,0.5 0.5\"\n    curved\n  />\n  <f-line\n  \tpoints=\"-0.5 -0.5,-1 -0.5,-1 -1\"\n    closed\n  />\n  <f-line\n  \tpoints=\"1 -0.5,0.5 -0.5,0.5 -1\"\n    closed curved\n  />\n</f-scene>\n  ",
    "props": {
      "x1": { "default": 0, "type": [null, null] },
      "y1": { "default": 0, "type": [null, null] },
      "x2": { "default": 0, "type": [null, null] },
      "y2": { "default": 0, "type": [null, null] },
      "points": { "default": "", "type": [null, null, null, null] },
      "stroke": { "default": "var(--primary)" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" },
      "closed": { "default": false },
      "curved": { "default": false },
      "tension": { "default": false, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "multiply": { "default": false }
    },
    "computed": {},
    "template": "\n    <g :transform=\"transform\">\n      <path\n        v-if=\"currentPoints\"\n        :d=\"path(currentPoints)\"\n        :stroke=\"stroke\"\n        :stroke-width=\"currentStrokeWidth\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        :fill=\"fill\"\n        :opacity=\"opacity\"\n        :style=\"{ mixBlendMode: multiply ? 'multiply' : ''}\"\n      />\n      <line\n        v-if=\"!currentPoints\"\n        :x1=\"x1\"\n        :y1=\"y1\"\n        :x2=\"x2\"\n        :y2=\"y2\"\n        :stroke=\"stroke\"\n        :stroke-width=\"currentStrokeWidth\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        :fill=\"fill\"\n        :opacity=\"opacity\"\n        :style=\"{ mixBlendMode: multiply ? 'multiply' : ''}\"\n      />\n    </g>\n    "
  },
  "FLine3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nDisplays a straight or segmented line.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-line3 points=\"\n      1  1  0,\n      1  0  1,\n      1 -1  0\n    \"/>\n  </f-rotation3>\n</f-scene3>\n  ",
    "props": {
      "x1": { "default": 0, "type": [null, null] },
      "y1": { "default": 0, "type": [null, null] },
      "z1": { "default": 0, "type": [null, null] },
      "x2": { "default": 0, "type": [null, null] },
      "y2": { "default": 0, "type": [null, null] },
      "z2": { "default": 0, "type": [null, null] },
      "points": { "default": "", "type": [null, null, null, null] },
      "stroke": { "default": "color('secondary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    }
  },
  "FLink": {
    "example": "Displays an internal or external link.\n\nThis link goes to local <f-link to=\"/f-scene\">f-scene</f-link> documentaton route\n\nThis link goes to <f-link to=\"https://pudding.cool/2018/02/waveforms/\">external site</f-link>\n\nThis link goes to <f-link to=\"props\">Local slide</f-link> with ID or section `props`\n",
    "props": {
      "to": {
        "default": "",
        "type": [null, null],
        "description": "Local route to navigate"
      }
    },
    "methods": {},
    "computed": {},
    "template": "\n  <span>\n    <router-link v-if=\"isRoute\" :to=\"to\" @click.native=\"top\"><slot /></router-link>\n    <span v-if=\"isUrl\">\n      <a :href=\"to\" target=\"_blank\">\n        <slot />\n      </a>&nbsp;&nbsp;<f-external-icon style=\"transform: translateY(0.25em);\"/>\n    </span>\n    <a v-if=\"isId\" @click=\"goto(to)\" style=\"cursor: pointer\"><slot /></a>\n  </span>\n  "
  },
  "FMarkdown": {
    "components": { "FRender": { "props": {}, "methods": {} } },
    "props": ["content"],
    "methods": {},
    "computed": {},
    "template": "\n    <f-render :content=\"'<div>' + marked(processedContent, { breaks: true }) + '</div>'\" />\n  "
  },
  "FMath": {
    "mixins": [{}],
    "description": "\nTypesetting math equations in classic LaTeX format. It uses uses a [KaTeX](https://github.com/Khan/KaTeX) library with addional features such as colorized variables and multiline support.\n\n> A good tutorial on LaTeX format can be found here:  https://en.wikibooks.org/wiki/LaTeX/Mathematics\n\n#### Math equation\n\n<f-math>\n  b = a^2 + 100\n  c = \\frac{a}{b} = \\frac{10}{a^2 + 100}\n</f-math>\n\n#### Inline math\n\nEquations can also be set inline using `inline` prop.\n\nHere are <f-math inline>a^2 + 100</f-math> some <f-math inline>c = \\frac{a}{b} = \\frac{10}{a^2 + 100}</f-math> examples.\n\n#### Multiline math\n\nMath source can contain multiple newlines.  Internally the emtpy rows are removed and rows will be separated by `\\newline` command.\n\n<f-math>\n\n\tb = a^2 + 100\n  \n  c = \\frac{a}{b}\n\n</f-math>\n\nis the same as\n\n<f-math>\n\tb = a^2 + 100\n  c = \\frac{a}{b}\n</f-math>\n\nis the same as \n\n<f-math>\n\tb = a^2 + 100 \\newline c = \\frac{a}{b}\n</f-math>\n\nFor inline math, the empty rows and newlines in the source are not considered, the multiple rows are separated by `\\space` command.\n\nFor example <f-math inline>\n\tb = a^2 + 100\n  c = \\frac{a}{b}\n</f-math> is the same as <f-math inline>b = a^2 + 100 \\space c = \\frac{a}{b}</f-math>.\n\n#### Coloured math\n\nThere is a range of colors available for math equations. When color can be passed as a prop all contents of the equation will be coloured.\n\n<f-math inline red>red</f-math> <f-math inline orange>orange</f-math> <f-math inline blue>blue</f-math> <f-math inline purple>purple</f-math> <f-math inline green>green</f-math> <f-math inline gray>gray</f-math>\n\nFor partial coloring, one has to use `\\color{red}` setting in the equation.\n\n<f-math>\n\tcolor = \\color{red} red \\color{black}\n  color = \\color{orange} orange \\color{black}\n  color = \\color{blue} purple \\color{black}\n  color = \\color{purple} purple \\color{black}\n  color = \\color{green} green \\color{black}\n  color = \\color{gray} gray  \\color{black}\n</f-math>\n\n***Note*** Setting `\\color{red}` or any other color acts as a *trigger*: if you set it, it will spread through the rest of the equation.\n\nTo stop the color spreading, you will have to add another setting `\\color{black}` to the point where coloring should be ending.\n\nSpreading color:\n\n<f-math>\n\t\\color{red} a \\cdot b \\cdot c\n</f-math>\n\nNon-spreading color:\n\n<f-math>\n\t\\color{red} a \\color{black} \\cdot b \\cdot c\n</f-math>\n\n#### Live variables\n\nWhen using live variables, it is recommended to set a `:update` prop that triggers instant re-rendering of the equation:\n\n<f-slider integer set=\"m\" />\n\nWithout `:update` prop:\n\n<f-math>\n  b = a + {{ get('m',0) }}\n</f-math>\n\nWith `:update` prop:\n\n<f-math :update=\"get('m',0)\">\n  b = a + {{ get('m',0) }}\n</f-math>\n\n  ",
    "props": {
      "inline": { "default": false },
      "red": { "default": false },
      "orange": { "default": false },
      "purple": { "default": false },
      "blue": { "default": false },
      "green": { "default": false },
      "gray": { "default": false },
      "update": { "default": null, "type": [null, null, null, null] }
    },
    "methods": {},
    "template": "\n    <div\n      v-html=\"math\"\n      :style=\"{\n        display: inline ? 'inline' : 'block',\n        padding: inline ? 0 : '1rem 2rem',\n        fontSize: inline ? '' : '1.1em',\n        color: 'color: var(--primary)'\n      }\"\n    />\n  ",
    "css": "\n  @import url(\"https://unpkg.com/katex/dist/katex.min.css\");\n  .katex .boxpad {\n    padding: 0;\n  }\n  "
  },
  "FMenu": {
    "mixins": [{}],
    "props": { "content": { "default": "" }, "menu": { "default": false } },
    "computed": {},
    "template": "\n    <div v-if=\"menu\" class=\"menu\">\n      <div style=\"height: var(--base6)\"></div>\n        <div style=\"\n          padding: var(--base3) 0;\n          overflow: auto;\n          height: 100%;\n        \">\n        <div v-for=\"(c, i) in currentContent\">\n          <h5\n            v-if=\"c.chapter\"\n            style=\"\n              padding: var(--base) var(--base3) var(--base) var(--base2);\n              margin: var(--base2) 0 0 0;\n            \"\n          >\n            {{ c.chapter }}\n          </h5>\n          <h5\n            style=\"\n              display: block;\n              cursor: pointer;\n              padding-left: 1ch;\n              margin: 0;\n              padding: var(--base) var(--base3) var(--base) var(--base3);\n              font-Weight: normal;\n            \"\n            @click=\"currentSection = c.section; $global.$emit('section', c.section)\"\n          >\n            <span :style=\"{\n              color: c.section == currentSection ? 'var(--blue)' : 'var(--gray)',\n              borderBottom: c.section == currentSection ? '2px solid var(--blue)' : '',\n            }\">\n            {{ c.section }}\n            </span>\n          </h5>\n        </div>\n      </div>\n    </div>\n    ",
    "css": "\n    .menu {\n      width: 250px;\n      height: 100vh;\n      position: sticky;\n      top: 0;\n    }\n    @media (max-width: 800px) {\n      .menu {\n        height: inherit;\n        max-height: 50vh;\n        position: static;\n        top: inherit;\n      }\n    }\n    "
  },
  "FMenuIcon": {
    "description": "\nMenu icon.\n  \n<f-menu-icon />\n\n<p />\n  ",
    "template": "\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M1 3V13\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13 4L5 4\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M15 8L5 8\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M12 12L5 12\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n  "
  },
  "FMidiIn": {
    "description": "\nReceives MIDI notes and control channel messages from MIDI input.\n\n<f-midi-in\n    @noteon=\"note => set('noteon', note)\"\n    @noteoff=\"note => set('noteoff', note)\"\n    @cc=\"cc => set('cc', cc)\"\n/>\n\n<pre>\nNoteon: {{ get('noteon') }}\nNoteoff: {{ get('noteoff') }}\nCC: {{ get('cc') }}\n</pre>\n\n> This component needs extra installation to work. See **Making music** tutorial.\n",
    "props": {
      "cc": { "default": "all", "type": [null, null] },
      "device": { "default": "all", "type": [null, null] }
    },
    "template": "\n  <div>\n    <slot /> \n  </div>\n  "
  },
  "FMidiInfo": {
    "description": "\nOutputs MIDI input and output info.\n\n<f-midi-info />\n\n#### Note\n\n> This component needs extra installation to work. See **Making music** tutorial.\n\n  ",
    "methods": {},
    "template": "\n<div>\n  <h4>Inputs</h4>\n  <f-table\n    v-if=\"inputs.length\"\n    :rows=\"defaultInput().concat(inputs.map(formatInput))\"\n  />\n  <blockquote v-else>No MIDI inputs</blockquote>\n  <h4>Outputs</h4>\n  <f-table\n    v-if=\"outputs.length\"\n    :rows=\"defaultOutput().concat(outputs.map(formatOutput))\"\n  />\n  <blockquote v-else>No MIDI outputs</blockquote>\n</div>\n  "
  },
  "FMidiOut": {
    "description": "\n<f-midi-out v-slot=\"{ noteon, noteoff, cc }\">\n  <button\n    v-on:mousedown=\"() => noteon('C4')\"\n    v-on:mouseup=\"() => noteoff('C4')\"\n  >\n    Send C4\n  </button>\n  <button\n    v-on:mousedown=\"() => noteon('D4')\"\n    v-on:mouseup=\"() => noteoff('D4')\"\n  >\n    Send D4\n  </button>\n  <p />\n  <f-slider\n    title=\"Send CC 2\"\n    to=\"127\"\n    integer\n    v-on:value=\"value => cc(value, 2)\"\n  />\n</f-midi-out>\n\n> This component needs extra installation to work. See **Making music** tutorial.\n  ",
    "props": {
      "cc": { "default": 0, "type": [null, null] },
      "channel": { "default": 1, "type": [null, null] },
      "device": { "default": "all", "type": [null, null] }
    },
    "methods": {},
    "template": "\n  <div>\n    <slot :cc=\"sendCc\" :noteon=\"sendNoteon\" :noteoff=\"sendNoteoff\" /> \n  </div>\n  "
  },
  "FMirrorX": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nMirrors children element around horizontal x axis.\n\n<f-scene grid>\n  <f-mirror-x>\n  \t<f-rotation>\n      <f-box\n        rotation=\"10\"\n        :stroke=\"color('red')\"\n      />\n    </f-rotation>\n  </f-mirror-x>\n</f-scene>\n  ",
    "props": {
      "r": { "default": 2, "type": [null, null] },
      "step": { "default": 0, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "computed": {},
    "template": "\n  <f-group\n    :transform=\"transform\"\n    :opacity=\"opacity\"\n  >\n    <defs>\n      <clipPath :id=\"id\">\n      <rect\n          :x=\"-r\"\n          :y=\"0\"\n          :width=\"r * 2\"\n          :height=\"r\"\n        />\n      </clipPath>\n    </defs>\n\n    <f-group :clip-path=\"'url(#' + id + ')'\">\n      <f-group :position=\"[0,step]\">\n        <slot :value=\"0\" />\n      </f-group>\n    </f-group>\n    <f-group\n      :clip-path=\"'url(#' + id + ')'\"\n      transform=\"scale(1,-1)\"\n    >\n      <f-group :position=\"[0,step]\">\n        <slot :value=\"1\" />\n      </f-group>\n    </f-group>\n\n  </f-group>  \n  "
  },
  "FMirrorY": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nMirrors children element around vertical y axis.\n\n<f-scene grid>\n  <f-mirror-y>\n  \t<f-rotation>\n      <f-box\n        rotation=\"10\"\n        :stroke=\"color('red')\"\n      />\n    </f-rotation>\n  </f-mirror-y>\n</f-scene>\n  ",
    "props": {
      "r": { "default": 1, "type": [null, null] },
      "step": { "default": 0, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "computed": {},
    "template": "\n  <f-group\n    :transform=\"transform\"\n    :opacity=\"opacity\"\n  >\n    <defs>\n      <clipPath :id=\"id\">\n        <rect\n          x=\"0\"\n          :y=\"-r\"\n          :width=\"r\"\n          :height=\"r * 2\"\n        />\n      </clipPath>\n    </defs>\n\n    <f-group :clip-path=\"'url(#' + id + ')'\">\n      <f-group :position=\"[step,0]\">\n        <slot :value=\"0\" />\n      </f-group>\n    </f-group>\n    <f-group\n      :clip-path=\"'url(#' + id + ')'\"\n      transform=\"scale(-1,1)\"\n    >\n      <f-group :position=\"[step,0]\">\n        <slot :value=\"1\" />\n      </f-group>\n    </f-group>\n\n  </f-group>  \n  "
  },
  "FMouse": {
    "description": "\n\nReturns mouse coordinates\n\n#### Setting a global value\n\n<f-mouse set=\"m1\" />\n\n    {{ get('m1') }}\n\n#### Setting a local value\n\n<f-mouse v-slot=\"{ value: m2 }\">\n\n\t  {{ m2 }}\n\n</f-mouse>\n\n#### Sending and receiving events\n\nSimplest way to send mouse events to other listeners is to use `send` parameter when you have to specify event channel name:\n\n<f-mouse send=\"m3\" />\n\n<f-receive receive=\"m3\" v-slot=\"{ value: m3 }\">\n\n    {{ m3 }}\n\n</f-receive>\n\n#### Custom mouse events handling\n\nTo set up a custom way to handle `<f-mouse>` events, you have to listen `@value` event, define event callback function and do anything there with mouse data.\n\nHere is a sample where we just use mouse x-coordinate, use `set` helper to set global state `x` and `send` helper send the mouse events to other listeners.\n\n<f-mouse \n  @value=\"([x,y]) => { set('x', x); send('x', x) }\"\n/>\n\n    {{ get('x') }}\n\n<f-receive receive=\"x\" v-slot=\"{ value: x }\">\n\n    {{ x }}\n\n</f-receive>\n\n\n  ",
    "props": {
      "set": { "default": "", "description": "Name for global value to set" },
      "send": {
        "default": "",
        "description": "Name for global event channel to send values to"
      },
      "from": { "default": 0, "type": [null, null, null] },
      "to": { "default": false, "type": [null, null, null] }
    },
    "computed": {},
    "methods": {},
    "template": "\n  <div><slot :value=\"currentMouse\" /></div>\n  "
  },
  "FNextButton": {
    "description": "\n\n> This page works best in slides mode <f-slides-icon  />\n\nButton that navigates to the next slide.\n\n<f-next-button />\n\n---\n\n  ",
    "props": {
      "title": { "default": "Next step", "description": "Button title" }
    },
    "methods": {},
    "template": "\n  <button v-show=\"get('type','slides') == 'slides'\" class=\"primary\" @click=\"send('next')\">{{ title }} <f-rightarrow-icon /></button>\n  "
  },
  "FNoteIcon": {
    "description": "\nNote icon.\n  \n<f-note-icon />\n\n<p />\n    ",
    "props": {
      "size": {
        "default": "medium",
        "description": "Icon size: `small` `medium` `large`"
      }
    },
    "template": "\n  <f-icon icon=\"note\" :size=\"size\" />\n  "
  },
  "FNotes": {
    "description": "\nDisplays inline notes in a sidebar. Notes button is in the bottom of the page.\n\n<f-notes title=\"Sample notes\">\n  Sample notes content\n</f-notes>\n  ",
    "props": {
      "title": { "default": "Teacher notes" },
      "size": { "default": "narrow" }
    },
    "template": "\n  <span>\n    <span\n      @click.prevent=\"open = true\"\n      style=\"\n        position: absolute;\n        right: var(--base);\n        bottom: var(--base);\n    \">\n      <slot name=\"button\">\n        <a class=\"quaternary\">{{ title }}</a>\n      </slot>\n    </span>\n    <f-overlay :size=\"size\" v-if=\"open\">\n      <div style=\"padding: var(--base2); position: relative;\">\n        <a class=\"quaternary\" style=\"\n          position: absolute;\n          top: var(--base2);\n          right: var(--base2);\n        \"\n        @click=\"open = false\"\n        >\n          <f-close-icon />\n        </a>\n        <slot />\n      </div>\n    </f-overlay>\n  </span>\n  "
  },
  "FOverlay": {
    "props": { "size": { "default": "narrow" } },
    "computed": {},
    "template": "\n  <portal to=\"overlay\">\n    <f-fade style=\"\n      position: fixed;\n      top: 0;\n      right: 0; \n      bottom: 0;\n      background: var(--white);\n      overflowY: auto;\n      box-shadow: -5px 0 10px rgba(0,0,0,0.1);\n    \"\n    :style=\"{\n      width: currentSize\n    }\"\n  >\n      <slot />\n    </f-fade>\n  </portal>\n  "
  },
  "FPager": {
    "description": "\nSets a global pager for slides, shows prev / next buttons and also provides keyboard hotkeys.\n\n<f-pager />\n",
    "methods": {},
    "template": "\n     <portal to=\"topright\" :order=\"2\">\n      <f-inline>\n        <a class=\"quaternary\" style=\"padding: 0 4px\" @click=\"send('prev')\" ><f-leftarrow-icon /></a>\n        <a class=\"quaternary\" style=\"padding: 0 4px\" @click=\"send('next')\" ><f-rightarrow-icon /></a>\n      </f-inline>\n    </portal>\n  "
  },
  "FPeopleIcon": {
    "description": "\nPeople icon.\n  \n<f-people-icon />\n\n<p />\n  ",
    "props": {
      "rotation": { "default": 0, "type": [null, null] },
      "description": "Rotation angle in degrees"
    },
    "template": "\n  <f-artboard :width=\"size\" :height=\"size\">\n    <f-circle\n      :x=\"size / 2\"\n      :y=\"size\"\n      :r=\"size / 2.2\"\n      stroke=\"var(--icon-stroke)\"\n      stroke-width=\"2\"\n      fill=\"var(--icon-fill)\"\n    />\n    <f-circle\n      :x=\"size / 2\"\n      :y=\"size / 4 + 3\"\n      :r=\"size / 3.5\"\n      stroke=\"var(--icon-stroke)\"\n      stroke-width=\"2\"\n      fill=\"var(--icon-fill)\"\n    />\n    <f-line\n      x1=\"1\"\n      :y1=\"size - 1\"\n      :x2=\"size - 1\"\n      :y2=\"size - 1\"\n      stroke-width=\"2\"\n    />\n  </f-artboard>\n  "
  },
  "FPiano": {
    "description": "\nDisplays a piano roll.\n\n<f-piano  />\n\nPiano roll can also display highlighted keys.\n\n<f-piano notes=\"C4 E4 G4\" />\n\nAlso, it emits `noteon` and `noteoff` events so it can be used as a virtual keyboard to play notes.\n\n<f-synth v-slot=\"{ noteon, noteoff }\">\n  <f-piano\n    v-on:noteon=\"noteon\"\n    v-on:noteoff=\"noteoff\"\n  />\n</f-synth>\n  ",
    "props": { "notes": { "default": "", "type": [null, null] } },
    "methods": {},
    "computed": {},
    "template": "\n  <f-artboard :width=\"chunk(octaves,12).length * (7 * 15) + 6\" height=\"55\">\n    <f-group\n      v-for=\"(octave,i) in chunk(octaves,12)\"\n      :key=\"i\"\n      :position=\"[i * (7 * 15),0]\"\n    >\n    <f-box\n      v-for=\"(n,j) in octave\"\n      v-if=\"!n.sharp\"\n      :key=\"j\"\n      :x=\"xOffset(j)\"\n      :y=\"25 + 3\"\n      width=\"15\"\n      height=\"50\"\n      stroke-width=\"2\"\n      :fill=\"noteFill(n)\"\n      @mousedown.native=\"$emit('noteon', n.note)\"\n      @mouseup.native=\"$emit('noteoff', n.note)\"\n      @touchstart.native=\"$emit('noteon', n.note)\"\n      @touchend.native=\"$emit('noteoff', n.note)\"\n      style=\"cursor: pointer\"\n    />\n    <f-box\n      v-for=\"(n,j) in octave\"\n      v-if=\"n.sharp\"\n      :key=\"j\"\n      :x=\"xOffset(j)\"\n      :y=\"25 / 2 + 3\"\n      width=\"10\"\n      height=\"25\"\n      stroke-width=\"2\"\n      :fill=\"noteFill(n)\"\n      @mousedown.native=\"$emit('noteon', n.note)\"\n      @mouseup.native=\"$emit('noteoff', n.note)\"\n      @touchstart.native=\"$emit('noteon', n.note)\"\n      @touchend.native=\"$emit('noteoff', n.note)\"\n      style=\"cursor: pointer\"\n    />\n    </f-group>\n  />\n  </f-artboard>\n  "
  },
  "FPixel": {
    "inject": ["provider"],
    "description": "\nDraws a single pixel onto a 2D canvas.\n\n> For drawing multiple pixels, use more performant `f-pixels`.\n\n<f-canvas>\n  <f-pixel v-for=\"p in 300\" :key=\"p\" :x=\"random(0,300)\" :y=\"random(0,300)\" />\n</f-canvas>\n\n<p />\n    ",
    "props": {
      "x": { "default": 0, "type": [null, null] },
      "y": { "default": 0, "type": [null, null] },
      "fill": { "default": "color('primary')", "type": [null, null] }
    },
    "computed": {}
  },
  "FPixels": {
    "inject": ["provider"],
    "description": "\nCreates a bitmap on a canvas from `width × height ` array of pixels. Each pixel is going through `:pixel` function that returns pixel color as  `[r,g,b,a]`.\n\n<f-canvas>\n  <f-pixels :pixel=\"index => [random(0,255),random(0,255),random(0,255),255]\" />\n</f-canvas>\n\n<p />\n  ",
    "props": { "pixel": {} }
  },
  "FPoint": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\n\nDisplays a point in 2D space.\n\n#### A single point\n\n<f-scene grid>\n  <f-point x=\"1\" y=\"1\" />\n</f-scene>\n\n#### Multiple points as a string\n\n<f-scene grid>\n  <f-point points=\"1 1, 1 -1; -1 -1; -1 1\" />\n</f-scene>\n\n#### Multiple points calculated by a function\n\n<f-scene grid>\n  <f-point\n    :points=\"\n      range(-4,4,0.05).map(x => ({ x, y: Math.cos(x) }))\n    \"\n    :fill=\"color('red')\"\n  />\n  <f-point\n    :points=\"\n      range(-4,4,0.05).map(x => ({ x, y: Math.sin(x) }))\n    \"\n    :fill=\"color('blue')\"\n  />\n</f-scene>\n  ",
    "props": {
      "x": { "default": 0, "type": [null, null] },
      "y": { "default": 0, "type": [null, null] },
      "points": { "default": "", "type": [null, null, null, null] },
      "stroke": {
        "default": "",
        "description": "***DEPRECIATED:*** Use `fill` instead"
      },
      "strokeWidth": {
        "default": "",
        "type": [null, null],
        "description": "***DEPRECIATED:*** Use `r` instead"
      },
      "r": { "default": 1.5, "type": [null, null] },
      "fill": { "default": "color('primary')" },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "computed": {},
    "template": "\n    <g :transform=\"transform\">\n      <f-circle\n        v-if=\"currentPoints\"\n        v-for=\"(point,i) in currentPoints\"\n        :key=\"i\"\n        :points=\"[point,point]\"\n        :fill=\"currentFillColor\"\n        stroke=\"none\"\n        :r=\"currentRadius\"\n        :opacity=\"opacity\"\n      />\n      <f-circle\n        v-if=\"!currentPoints\"\n        :points=\"[[x, y],[x, y]]\"\n        :fill=\"currentFillColor\"\n        stroke=\"none\"\n        :r=\"currentRadius\"\n        :opacity=\"opacity\"\n      />\n    </g>\n    "
  },
  "FPoint3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nDisplays a point in 3D space.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-point3\n      :points=\"\n        range(-4,4,0.05)\n          .map(x => [x,Math.cos(x),Math.sin(x)])\n      \"\n      :stroke=\"color('red')\"\n    />\n    <f-point3\n    :points=\"\n      range(-4,4,0.05)\n        .map(x => [x,Math.sin(x),Math.cos(x)])\n    \"\n    :stroke=\"color('blue')\"\n    />\n  </f-rotation3>\n</f-scene3>\n  ",
    "props": {
      "x": { "default": 0, "type": [null, null] },
      "y": { "default": 0, "type": [null, null] },
      "z": { "default": 0, "type": [null, null] },
      "points": { "default": "", "type": [null, null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "computed": {},
    "template": "\n    <f-group3>\n      <f-line3\n        v-if=\"currentPoints\"\n        v-for=\"(point,i) in currentPoints\"\n        :key=\"i\"\n        :points=\"[point,point]\"\n        :stroke=\"strokeColor\"\n        :stroke-width=\"strokeWidth\"\n        :opacity=\"opacity\"\n      />\n      <f-line3\n        v-if=\"!currentPoints\"\n        :x1=\"x\"\n        :y1=\"y\"\n        :z1=\"z\"\n        :x2=\"x\"\n        :y2=\"y\"\n        :z2=\"z\"\n        :stroke=\"strokeColor\"\n        :stroke-width=\"strokeWidth\"\n        :opacity=\"opacity\"\n      />\n    </f-group3>\n    "
  },
  "FPolargrid": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nDisplays a polar grid.\n\n#### Default values\n\n<f-scene>\n  <f-polargrid />\n</f-scene> \n\n#### Custom values\n\n<f-scene>\n  <f-polargrid count=\"24\" step=\"0.125\" />\n</f-scene> \n  ",
    "props": {
      "count": { "default": 6 },
      "r": { "default": 4 },
      "step": { "default": 0.5 },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] }
    },
    "methods": {},
    "template": "\n    <f-group :transform=\"transform\">\n      <f-line\n        v-for=\"(a,i) in range(0,360,360 / count).slice(0,count)\"\n        :key=\"'a' + i\"\n        :x2=\"polarx(a,4)\"\n        :y2=\"polary(a,4)\"\n        stroke-width=\"1\"\n        opacity=\"0.25\"\n      />\n      <f-circle\n        v-for=\"(cr,j) in range(0,r,step)\"\n        :key=\"'b' + j\"\n        :r=\"cr\"\n        stroke-width=\"1\"\n        opacity=\"0.25\"\n      />\n    </f-group>\n    "
  },
  "FPolygon": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "example": "\nDisplays a closed polygon based on points.\n\n<f-scene grid>\n  <f-polygon points=\"0 0, 1 0, 0 1\" />\n  <f-polygon\n    points=\"0 0, 1 0, 0 1\"\n    position=\"1 1\"\n    rotation=\"180\"\n    scale=\"0.25\"\n    :stroke=\"color('red')\"\n  />\n</f-scene>\n  ",
    "props": {
      "points": { "default": "", "type": [null, null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "multiply": { "default": false }
    },
    "computed": {},
    "template": "\n    <f-line\n      :points=\"points\"\n      :stroke=\"currentStrokeColor\"\n      :stroke-width=\"strokeWidth\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n      :fill=\"fill\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n      :closed=\"true\"\n      :scale=\"scale\"\n      :multiply=\"multiply\"\n    />\n  "
  },
  "FPolygon3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nDraws a 2D polygon on a plane in 3D space, accepts 2D coordinates in <code>:points</code> array.\n\n<f-scene3 isometric>\n  <f-rotation3>\n    <f-grid3 />\n    <f-polygon3\n    points=\"\n      0  0,\n      1  0,\n      0  1,\n      0  0\n    \"\n    :stroke=\"color('red')\"\n    :fill=\"color('blue')\"\n    />\n  </f-rotation3>\n</f-scene3>\n  ",
    "components": {
      "InternalPolygon": {
        "mixins": [
          {
            "mixins": [
              {
                "inject": ["_baseUrl"],
                "props": { "baseUrl": {} },
                "methods": {},
                "template": "\n    <div><slot/></div>\n  "
              }
            ],
            "inject": ["parentObj"],
            "props": {
              "name": {},
              "type": { "default": "Object3D" },
              "obj": {},
              "scale": { "type": [null, null, null, null] },
              "position": { "type": [null, null, null] },
              "rotation": { "type": [null, null, null] }
            },
            "watch": {
              "scale": { "deep": true },
              "position": { "deep": true },
              "rotation": { "deep": true }
            },
            "methods": {}
          }
        ],
        "props": {
          "points": { "default": "", "type": [null, null, null] },
          "fill": { "default": "" },
          "opacity": { "default": 1, "type": [null, null] }
        }
      }
    },
    "props": {
      "points": { "default": "", "type": [null, null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": "3", "type": [null, null] },
      "fill": { "default": "" },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "computed": {},
    "template": "\n    <f-group3>\n      <InternalPolygon :points=\"currentPoints\" :fill=\"fill\" :opacity=\"opacity\" position=\"0 0 0\" />\n      <f-line3 :points=\"currentPoints\" :stroke=\"strokeColor\" :strokeWidth=\"strokeWidth\" :opacity=\"opacity\" />\n    </f-group3>\n  "
  },
  "FPolyhedron3": {
    "description": "\nDisplays a polyhedron geometry in 3D space.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-polyhedron3\n      hedron=\"Tetrahedron\"\n      position=\"-1.5 0 0\"\n      scale=\"0.5\"\n    />\n    <f-polyhedron3\n      hedron=\"Octahedron\"\n      position=\"-0.5 0 0\"\n      scale=\"0.5\"\n    />\n    <f-polyhedron3\n      hedron=\"Icosahedron\"\n      position=\"0.5 0 0\"\n      scale=\"0.5\"\n    />\n    <f-polyhedron3\n      hedron=\"Dodecahedron\"\n      position=\"1.5 0 0\"\n      scale=\"0.5\"\n    />\n  </f-rotation3>\n</f-scene3>  \n  ",
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "props": {
      "hedron": { "default": "Icosahedron" },
      "r": { "default": 1, "type": [null, null] },
      "fill": { "default": "" },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "shading": { "default": true }
    }
  },
  "FPrevButton": {
    "description": "\n\n> This page works best in slides mode <f-slides-icon  />\n\n<a @click=\"() => send('next')\">Go to next slide</a>\n\n---\n\nButton that navigates to the previous slide.\n\n<f-prev-button />\n",
    "props": { "title": { "default": "", "description": "Button title" } },
    "methods": {},
    "template": "\n  <button\n    v-show=\"get('type','slides') == 'slides'\"\n    class=\"secondary\"\n    @click.prevent=\"send('prev')\"\n  >\n    <f-leftarrow-icon />\n    {{ title }}&nbsp;\n  </button>\n  "
  },
  "FReceive": {
    "description": "\nSends and receives a global event with a payload (value).\n\nTo send an event, use `send(name, value)` helper:\n\n<button v-on:click=\"send('hey', 1)\">\n  Send event with name \"hey\" with value 1\n</button>\n\n<p />\n\nTo receive event, use `f-receive` component with corresponding `receive` parameter:\n\n<f-receive receive=\"hey\" v-slot=\"{ value }\">\n  <output >{{ value ? 'Received ' + value : 'Waiting for event \"hey\"' }}</output>\n</f-receive>\n  ",
    "props": {
      "receive": { "default": "value", "description": "Value name to receive" },
      "set": { "default": "", "description": "Name for global value to set" }
    },
    "slots": {
      "value": {
        "type": "value",
        "description": "Received event payload value"
      }
    },
    "template": "\n    <div>\n      <slot :value=\"value\" />\n    </div>\n  "
  },
  "FRect": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nDisplays a 2D rectangle.\n\n<f-scene grid>\n  <f-rect />\n  <f-rect\n    :stroke=\"color('red')\"\n    position=\"1 1\"\n    scale=\"0.5\"\n    corner-radius=\"0.3\"\n  />\n</f-scene>\n  ",
    "props": {
      "x": { "default": 0, "type": [null, null] },
      "y": { "default": 0, "type": [null, null] },
      "width": { "default": 1, "type": [null, null] },
      "height": { "default": 1, "type": [null, null] },
      "cornerRadius": { "default": 0, "type": [null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" },
      "position": { "default": "", "type": [null, null, null, null] },
      "rotation": { "default": "", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "multiply": { "default": false }
    },
    "computed": {},
    "template": "\n  <rect\n    :x=\"x\"\n    :y=\"y\"\n    :rx=\"cornerRadius\"\n    :ry=\"cornerRadius\"\n    :width=\"width\"\n    :height=\"height\"\n    :stroke=\"currentStrokeColor\"\n    :stroke-width=\"currentStrokeWidth\"\n    stroke-linecap=\"round\"\n    stroke-linejoin=\"round\"\n    :fill=\"fill\"\n    :transform=\"transform\"\n    :opacity=\"opacity\"\n  />\n  "
  },
  "FRegularpolygon": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nDisplays a `count`-sided regular polygon.\n\n<f-scene grid>\n  <f-regularpolygon />\n  <f-regularpolygon\n    count=\"3\"\n    :stroke=\"color('red')\"\n  />\n</f-scene>\n  ",
    "props": {
      "x": { "default": "", "type": [null, null] },
      "y": { "default": "", "type": [null, null] },
      "count": { "default": 6, "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "multiply": { "default": false }
    },
    "methods": {},
    "computed": {},
    "template": "\n    <f-group :transform=\"transform\">\n      <f-polygon\n        :points=\"polarpoints(count,r)\"\n        :stroke=\"currentStrokeColor\"\n        :stroke-width=\"strokeWidth\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        :fill=\"fill\"\n        :transform=\"positionTransform([[x || 0, y || 0]])\"\n        :opacity=\"opacity\"\n        :style=\"{ mixBlendMode: multiply ? 'multiply' : ''}\"\n      />\n    </f-group>\n  "
  },
  "FRegularpolygon3": {
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "description": "\nDisplays 2D regular polygon in 3D space.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-regularpolygon3 opacity=\"0.5\" />\n    <f-regularpolygon3\n      opacity=\"0.5\"\n      count=\"3\"\n      :stroke=\"color('red')\"\n    />\n  </f-rotation3>\n</f-scene3>\n  ",
    "props": {
      "count": { "default": 6, "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "" },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "shading": { "default": true }
    },
    "computed": {},
    "template": "\n  <f-hedron3\n    :count=\"count\"\n    :r=\"r\"\n    :stroke=\"strokeColor\"\n    :stroke-width=\"strokeWidth\"\n    :fill=\"fill\"\n    :opacity=\"opacity || 1\"\n    :shading=\"shading\"\n  />\n  "
  },
  "FRender": { "props": {}, "methods": {} },
  "FRightarrowIcon": {
    "description": "\nRight arrow icon.\n  \n<f-rightarrow-icon />\n\n<p />\n  ",
    "template": "\n  <f-arrow-icon />\n  "
  },
  "FRotation": {
    "description": "\nRotates the child elements in 2D space.\n\n<f-scene grid>\n  <f-rotation>\n    <f-box />\n  </f-rotation>\n</f-scene>\n  ",
    "props": {
      "duration": {
        "default": 20000,
        "type": [null, null],
        "description": "Time for full rotation, in milliseconds."
      }
    },
    "template": "\n  <f-animation :duration=\"duration\">\n    <f-group\n      slot-scope=\"{ value }\"\n      :rotation=\"value\"\n    >\n      <slot  />\n    </f-group>\n  </f-animation>\n  "
  },
  "FRotation3": {
    "description": "\nRotates the child elements in 3D space.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-box3 />\n  </f-rotation3>\n</f-scene3>\n    ",
    "props": {
      "duration": {
        "default": 30000,
        "type": [null, null],
        "description": "Time for full rotation, in milliseconds."
      }
    },
    "template": "\n  <f-animation :duration=\"duration\">\n    <f-group3\n      slot-scope=\"{ value }\"\n      :rotation=\"[value,value,value]\"\n    >\n      <slot  />\n    </f-group3>\n  </f-animation>\n  "
  },
  "FRoundedpolygon": {
    "description": "\nDisplays a rounded polygon.\n\n<f-scene grid>\n  <f-roundedpolygon />\n</f-scene>\n  ",
    "props": {
      "x": { "default": 0, "type": [null, null] },
      "y": { "default": 0, "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "cornerRadius": { "default": 0.5, "type": [null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" }
    },
    "methods": {},
    "computed": {},
    "template": "\n  <f-group :scale=\"r\" :position=\"[x,y]\">\n    <f-group\n      v-for=\"a in range(0,5)\"\n      :rotation=\"360 / 6 * a\"\n      :key=\"a\"\n    >\n    <!-- Fill -->\n    <f-circle\n      :r=\"scale(cornerRadius,0,1,Math.sqrt(3) / 2,0)\"\n      :position=\"[0,-cornerRadius]\"\n      stroke\n      :fill=\"fill\"\n    />\n    <f-line\n      v-for=\"(a, i) in [-360 / 6, 360 / 6]\"\n      :key=\"'f' + i\"\n      :points=\"[[0,0],linepoint(\n        polarx(),\n        polary(),\n        polarx(a),\n        polary(a),\n        0.5\n      ),linepoint(\n        polarx(),\n        polary(),\n        polarx(a),\n        polary(a),\n        (1 - cornerRadius) / 2\n      ),\n      [0,-cornerRadius],[0,0]]\"\n      stroke\n      :fill=\"fill\"\n    />\n      <!-- Stroke -->\n      <f-arc\n      :stroke=\"strokeColor\"\n      :strokeWidth=\"strokeWidth\"\n      :start-angle=\"-360 / (6 * 2)\"\n      :end-angle=\"360 / (6 * 2)\"\n      :r=\"scale(cornerRadius,0,1,Math.sqrt(3) / 2,0)\"\n      :inner-radius=\"scale(cornerRadius,0,1,Math.sqrt(3) / 2,0)\"\n      :position=\"[0,-cornerRadius]\"\n    />\n    <f-line\n      v-for=\"(a, i) in [-360 / 6, 360 / 6]\"\n      :key=\"'s' + i\"\n      :points=\"[linepoint(\n        polarx(),\n        polary(),\n        polarx(a),\n        polary(a),\n        0.5\n      ),linepoint(\n        polarx(),\n        polary(),\n        polarx(a),\n        polary(a),\n        (1 - cornerRadius) / 2\n      )]\"\n      :strokeWidth=\"strokeWidth\"\n      :stroke=\"strokeColor\"\n    />\n    </f-group>\n  </f-group>\n  "
  },
  "FScene": {
    "description": "\n2D vector graphics scene with a coordinate system optimized for graph drawing. For more general vector graphics see `<f-artboard>`.\n\n<f-scene grid v-slot=\"{ mouse }\">\n\t<f-circle\n  \t:x=\"mouse.x\"\n    :y=\"mouse.y\"\n    :r=\"mouse.pressed ? 0.5 : 1\"\n  />\n</f-scene>\n  ",
    "props": {
      "width": {
        "default": 300,
        "type": [null, null],
        "description": "Scene width in pixels"
      },
      "height": {
        "default": 300,
        "type": [null, null],
        "description": "Scene height in pixels"
      },
      "grid": { "default": false, "description": "Show background grid?" },
      "polargrid": {
        "default": false,
        "description": "Show background polar grid?"
      },
      "dots": { "default": false, "description": "Show background grid?" },
      "step": {
        "default": 0.5,
        "type": [null, null],
        "description": "Background grid step or dots step or polar grid diameter step"
      },
      "count": {
        "default": 6,
        "type": [null, null],
        "description": "Background polar grid angle count"
      },
      "axis": { "default": false, "description": "Show axises?" },
      "responsive": { "default": false },
      "id": { "default": "" },
      "download": { "default": false }
    },
    "slots": {
      "mouse": {
        "type": "object",
        "description": "Mouse data as `mouse.x` `mouse.y` `mouse.pressed`"
      }
    },
    "computed": {},
    "template": "\n  <f-svg \n    :width=\"width\"\n    :height=\"height\"\n    :inner-x=\"innerX\"\n    :inner-y=\"innerY\"\n    :inner-width=\"innerWidth\"\n    :inner-height=\"innerHeight\"\n    :flip-y=\"true\"\n    style=\"\n      --text-size: 1.4%;\n      --text-transform: scale(1,-1);\n    \"\n    v-slot=\"{ mouse }\"\n    :responsive=\"responsive\"\n    :id=\"id\"\n    :download=\"download\"\n  >\n    <f-group>\n      <f-grid\n        v-if=\"grid\"\n        :inner-width=\"innerWidth\"\n        :inner-height=\"innerHeight\"\n        :step=\"step\"\n      />\n      <f-dots\n        v-if=\"dots\"\n        :inner-x=\"-2\"\n        :inner-y=\"-2\"\n        :inner-width=\"4\"\n        :inner-height=\"4\"\n        :step=\"step\"\n      />\n      <f-polargrid\n        v-if=\"polargrid\"\n        :r=\"innerWidth\"\n        :count=\"count\"\n        :step=\"step\"\n      />\n      <f-axis\n        v-if=\"axis\"\n        :inner-width=\"innerWidth\"\n        :inner-height=\"innerHeight\"\n      />\n      <slot :mouse=\"mouse\" :svgscale=\"svgScale\" />\n    </f-group>\n  </f-svg>\n  "
  },
  "FScene3": {
    "description": "\n3D scene with `x y z` coordinates ranging from `-2 to 2`.\n\nWe use a [ThreeJS](https://threejs.org/) wrapper with a custom SVG renderer.\n\n  <f-scene3>\n    <f-rotation3>\n      <f-grid3 />\n    </f-rotation3>\n  </f-scene3>\n  ",
    "components": {
      "Renderer": {
        "mixins": [{}],
        "props": {
          "webgl": { "default": false },
          "static": { "default": false },
          "size": { "required": true },
          "obj": {},
          "background": { "default": "#ffffff" },
          "responsive": { "default": false },
          "id": { "default": "" },
          "download": { "default": false }
        },
        "methods": {},
        "template": "\n  <div class=\"f-scene3\" :class=\"{ 'responsive': responsive }\">\n    <slot></slot>\n    <div ref=\"container\"></div>\n    <button v-if=\"download && !webgl\" class=\"quaternary\" @click=\"onDownload\">⤓ Download</button>\n  </div>\n  ",
        "css": "\n  .f-scene3 svg {\n    shape-rendering: crispEdges;\n  }\n  .f-scene3.responsive svg, .f-scene3.responsive canvas {\n    width: 100% !important;\n    height: 100% !important;\n  }\n  "
      },
      "Scene": {
        "mixins": [
          {
            "mixins": [
              {
                "inject": ["_baseUrl"],
                "props": { "baseUrl": {} },
                "methods": {},
                "template": "\n    <div><slot/></div>\n  "
              }
            ],
            "inject": ["parentObj"],
            "props": {
              "name": {},
              "type": { "default": "Object3D" },
              "obj": {},
              "scale": { "type": [null, null, null, null] },
              "position": { "type": [null, null, null] },
              "rotation": { "type": [null, null, null] }
            },
            "watch": {
              "scale": { "deep": true },
              "position": { "deep": true },
              "rotation": { "deep": true }
            },
            "methods": {}
          }
        ],
        "inject": ["global"],
        "props": { "obj": {} }
      },
      "Camera": {
        "mixins": [
          {
            "mixins": [
              {
                "inject": ["_baseUrl"],
                "props": { "baseUrl": {} },
                "methods": {},
                "template": "\n    <div><slot/></div>\n  "
              }
            ],
            "inject": ["parentObj"],
            "props": {
              "name": {},
              "type": { "default": "Object3D" },
              "obj": {},
              "scale": { "type": [null, null, null, null] },
              "position": { "type": [null, null, null] },
              "rotation": { "type": [null, null, null] }
            },
            "watch": {
              "scale": { "deep": true },
              "position": { "deep": true },
              "rotation": { "deep": true }
            },
            "methods": {}
          }
        ],
        "inject": ["global"],
        "props": { "obj": {}, "isometric": { "default": false } }
      },
      "AmbientLight": {
        "mixins": [
          {
            "mixins": [
              {
                "inject": ["_baseUrl"],
                "props": { "baseUrl": {} },
                "methods": {},
                "template": "\n    <div><slot/></div>\n  "
              }
            ],
            "inject": ["parentObj"],
            "props": {
              "name": {},
              "type": { "default": "Object3D" },
              "obj": {},
              "scale": { "type": [null, null, null, null] },
              "position": { "type": [null, null, null] },
              "rotation": { "type": [null, null, null] }
            },
            "watch": {
              "scale": { "deep": true },
              "position": { "deep": true },
              "rotation": { "deep": true }
            },
            "methods": {}
          }
        ],
        "props": { "color": { "default": 16777215, "type": [null, null] } }
      },
      "DirectionalLight": {
        "mixins": [
          {
            "mixins": [
              {
                "inject": ["_baseUrl"],
                "props": { "baseUrl": {} },
                "methods": {},
                "template": "\n    <div><slot/></div>\n  "
              }
            ],
            "inject": ["parentObj"],
            "props": {
              "name": {},
              "type": { "default": "Object3D" },
              "obj": {},
              "scale": { "type": [null, null, null, null] },
              "position": { "type": [null, null, null] },
              "rotation": { "type": [null, null, null] }
            },
            "watch": {
              "scale": { "deep": true },
              "position": { "deep": true },
              "rotation": { "deep": true }
            },
            "methods": {}
          }
        ]
      }
    },
    "props": {
      "width": { "default": 300, "type": [null, null] },
      "height": { "default": 300, "type": [null, null] },
      "grid": {
        "default": false,
        "type": [null, null],
        "description": "Show background grid"
      },
      "axis": {
        "default": false,
        "type": [null, null],
        "description": "Show axises"
      },
      "webgl": { "default": false },
      "static": { "default": false },
      "isometric": { "default": false },
      "responsive": { "default": false },
      "id": { "default": "" },
      "download": { "default": false }
    },
    "template": "\n  <Renderer\n    :size=\"{ w: width, h: height }\"\n    :webgl=\"webgl\"\n    :static=\"static\"\n    :responsive=\"responsive\"\n    :id=\"id\"\n    :download=\"download\"\n  >\n    <Scene>\n      <AmbientLight :color=\"webgl ? 0xffffff : 0x616161\" />\n      <DirectionalLight />\n      <Camera :position=\"{ x: 0, y: 0, z: 2.63 }\" :isometric=\"isometric\" />\n      <f-grid3 v-if=\"grid\" />\n      <f-axis3 v-if=\"axis\" />\n      <slot />\n    </Scene>\n  </Renderer>\n  "
  },
  "FSectionCard": {
    "description": " \n\nShows a navigation card that navigate the user to particular page.\n\n<f-section-card\n  title=\"Example section\"\n  section=\"example\"\n>\n  Contents of example section\n</f-section-card>\n\n<p />\n  ",
    "props": {
      "title": { "default": "" },
      "section": { "default": "" },
      "border": { "default": "var(--transparent)" },
      "background": { "default": "var(--yellow)" }
    },
    "methods": {},
    "template": "\n  <f-card\n\t  @click.native=\"send('closemenu'); goto(section);\"\n    :title=\"title\"\n    :border=\"get('section') == section ? 'var(--primary)' : border\"\n    :background=\"background\"\n  >\n\t  <slot />\n  </f-card>\n  "
  },
  "FSequencer": {
    "description": "\nStep sequencer emitting eight-note `beat1` / `beat2` / `...` events based on the `bpm`.\n\n<f-inline>\n  <button v-on:click=\"send('start')\">Start</button>\n  <button v-on:click=\"send('stop')\">Stop</button>\n</f-inline>\n\n<f-sequencer\n  beats=\"4\"\n  v-on:beat=\"beat => set('beat', beat)\"\n/>\n\n    Beat: {{ get('beat') }}\n\n> This component needs extra installation to work. See **Making music** tutorial.\n    ",
    "props": {
      "bpm": { "default": "120", "type": [null, null] },
      "beats": { "default": "8", "type": [null, null] }
    },
    "template": "\n  <div>\n    <slot /> \n  </div>\n  "
  },
  "FSheet": {
    "description": "\nFetches data from Google Sheets.\n\n#### Fetched data\n\n<f-sheet\n  id=\"110RcQmdpOkFcS2KIlahEh8QezwH2cwnihDiV__ZiYqk\"\n  v-slot=\"{ value }\"\n>\n  <pre>{{ value }}</pre>\n</f-sheet>\n\n#### Drawing a graph based on fetched data\n\n<f-sheet\n  id=\"110RcQmdpOkFcS2KIlahEh8QezwH2cwnihDiV__ZiYqk\"\n  v-slot=\"{ value }\"\n>\n  <f-scene>\n    <rect \n      v-for=\"(v,i) in value\"\n      :x=\"scale(i,0,value.length,-1.9,1.9)\"\n      :y=\"-2\"\n      :height=\"scale(v.age,0,100,0,2.9)\"\n      :width=\"(4 / value.length) - 0.1\"\n      fill=\"var(--red)\"\n      rx=\"0.05\"\n    />  \n  </f-scene>\n</f-sheet>\n\n\n  ",
    "props": { "id": { "default": "" } },
    "slots": {
      "value": {
        "type": "array",
        "description": "Fetched table contents as array of objects"
      }
    }
  },
  "FSidebar": {
    "description": "\nDisplays content in a sidebar\n\n<f-sidebar src=\"../README.md\">\n../README.md in a sidebar\n</f-sidebar>\n  ",
    "props": {
      "src": { "default": "" },
      "title": { "default": "Sidebar" },
      "size": { "default": "narrow" }
    },
    "template": "\n  <span>\n    <span\n      @click.prevent=\"open = true\"\n      style=\"\n        border-bottom: 1px dotted var(--gray);\n        cursor: alias;\n      \"\n    >\n      <slot>\n        <a style=\"\n          color: var(--blue);\n        \"\n        >{{ title }}</a>\n      </slot>\n    </span>\n    <f-overlay :size=\"size\" v-if=\"open\">\n      <a class=\"quaternary\" style=\"\n        position: absolute;\n        top: var(--base);\n        right: var(--base);\n        z-index: 1000;\n      \"\n      @click=\"open = false\"\n      >\n        <f-close-icon />\n      </a>\n      <f-fetch v-if=\"src\" :src=\"src\" v-slot=\"{ value: content }\">\n        <f-content type=\"document\" theme=\"light\" style=\"--content-padding: var(--base3)\" :content=\"content\" />\n      </f-fetch>\n      <div v-if=\"!src\" style=\"padding: var(--base3)\">\n        <slot name=\"content\" />\n      </div>\n    </f-overlay>\n  </span>\n  "
  },
  "FSlicePattern": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nClips the children element and rotating each towards the center of the circle.\n\nWhen `:count=\"2\"`, the children element is horizontally mirrored around x axis, similar to `<f-mirror-x>`\n\n<f-scene grid>\n\t<f-line\n  \tv-for=\"p in polarpoints()\"\n    :y2=\"p.y\"\n    :x2=\"p.x\"\n    opacity=\"0.25\"\n  />\n  <f-slice-pattern>\n    <f-rotation>\n      <f-box\n        :rotation=\"10\"\n        :stroke=\"color('red')\"/>\n      />\n    </f-rotation>\n  </f-slice-pattern>\n</f-scene>\n  ",
    "props": {
      "count": { "default": 6, "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "methods": {},
    "computed": {},
    "template": "\n  <f-group\n    :transform=\"transform\"\n    :opacity=\"opacity\"\n  >\n    <defs>\n      <clipPath :id=\"id1\">\n        <polygon\n          :points=\"[\n            [0,0],\n            [polarpoints(count,r)[0].x, polarpoints(count,r)[0].y],\n            [polarpoints(count,r)[1].x, polarpoints(count,r)[1].y]\n          ]\"\n        />\n      </clipPath>\n      <clipPath :id=\"id2\">\n        <rect\n          x=\"0\"\n          :y=\"-r\"\n          :width=\"r\"\n          :height=\"r * 2\"\n        />\n      </clipPath>\n    </defs>\n    <f-group\n      v-if=\"count > 2\"\n      v-for=\"(a,i) in range(0,360,360 / count)\"\n      :key=\"i\"\n      :rotation=\"a\"\n      :clip-path=\"'url(#' + id1 + ')'\"\n    >\n      <slot :value=\"i\" />\n    </f-group>\n    <f-group v-if=\"count == 2\">\n      <f-group :clip-path=\"'url(#' + id2 + ')'\">\n        <slot :value=\"0\" />\n      </f-group>\n      <f-group\n        :clip-path=\"'url(#' + id2 + ')'\"\n        transform=\"scale(-1,1)\"\n      >\n        <slot :value=\"1\" />\n      </f-group>\n    </f-group>\n  </f-group>  \n  "
  },
  "FSlider": {
    "description": "\nDisplays numeric slider and allows to get its value.\n\n### Simplest usage\n\nProvide a `set` prop to set a global variable:\n\n    <f-slider set=\"d\" />\n\n<f-slider set=\"d\" />\n\nand `get` it with utility function:\n\n  <pre v-pre>{{ get('d') }}</pre>\n\nOutput: \n\n<output>d value: {{ get('d') }}</output>\n\n### Integer value\n\nTo get the integer value, set `integer` prop:\n\n    <f-slider set=\"e\" integer />\n\n<f-slider set=\"e\" integer />\n\n<output>b value: {{ get('e') }}</output>\n\n\n### Local data\n\nIn some cases you want animation value to be available to its children components only. You can use the following:\n\n    <f-slider v-slot=\"{ value: f }\">\n      <output>{{ f }}</output>\n    </f-slider>\n\n<f-slider v-slot=\"{ value: f }\">\n  <output>Local f value: {{ f }}</output>\n</f-slider>\n  ",
    "props": {
      "value": { "default": 0, "type": [null, null] },
      "title": { "default": "" },
      "from": { "default": 0, "type": [null, null] },
      "to": { "default": 360, "type": [null, null] },
      "integer": { "default": false },
      "step": { "default": "", "type": [null, null] },
      "set": { "default": "", "description": "Name for a global value to set" },
      "plain": { "default": false, "type": [null, null] }
    },
    "methods": {},
    "computed": {},
    "template": "\n    <div>\n      <div>\n        <label>\n          <slot name=\"title\" :value=\"innerValue\">\n            <template v-if=\"currentTitle\">{{ currentTitle }}&nbsp;&nbsp;<code>{{ innerValue }}</code></template>\n          </slot>\n        </label>\n        <input\n          v-if=\"!set\"\n          style=\"margin-bottom: 1rem;\"\n          type=\"range\"\n          v-model=\"innerValue\"\n          :min=\"from\"\n          :max=\"to\"\n          :step=\"step ? step : (integer ? 1 : 0.001)\"\n        />\n        <input\n          v-if=\"set\"\n          style=\"margin-bottom: 1rem;\"\n          type=\"range\"\n          :value=\"getValue(set, 0)\"\n          @input=\"innerValue = makeNumber($event.target.value)\"\n          :min=\"from\"\n          :max=\"to\"\n          :step=\"step ? step : (integer ? 1 : 0.001)\"\n        />\n      </div>\n      <slot :value=\"innerValue\" />\n    </div>\n  "
  },
  "FSlidesIcon": {
    "description": "\nDocument icon.\n  \n<f-slides-icon />\n\n<p />\n  ",
    "template": "\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect x=\"1\" y=\"2\" width=\"14\" height=\"12\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M6 11V5L11 8L6 11Z\" stroke=\"var(--icon-stroke)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n </svg>\n  "
  },
  "FSpinPattern": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nRepeats elements along the circle, rotating each towards the center of the circle.\n\n<f-scene grid>\n  <f-spin-pattern>\n    <f-box\n      slot-scope=\"data\"\n      :stroke=\"color('red')\"\n    />\n    <f-box />\n  </f-spin-pattern>\n  <f-box />\n</f-scene>\n  ",
    "props": {
      "count": { "default": 6, "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "methods": {},
    "template": "\n  <f-group\n    :transform=\"transform\"\n    :opacity=\"opacity\"\n  >\n    <f-group\n      v-for=\"(a,i) in range(0,360,360 / count).slice(0, count)\"\n      :key=\"i\"\n      :rotation=\"a\"\n    >\n      <f-group :position=\"[r,0]\">\n        <slot :index=\"i\" />\n      </f-group>\n    </f-group>\n  </f-group>  \n  "
  },
  "FSvg": {
    "mixins": [{}],
    "props": {
      "width": { "default": 300, "type": [null, null] },
      "height": { "default": 300, "type": [null, null] },
      "innerX": { "default": 0, "type": [null, null] },
      "innerY": { "default": 0, "type": [null, null] },
      "innerWidth": { "default": null, "type": [null, null] },
      "innerHeight": { "default": null, "type": [null, null] },
      "flipX": { "default": false },
      "flipY": { "default": false },
      "responsive": { "default": false },
      "id": { "default": "" },
      "download": { "default": false }
    },
    "slots": {
      "mouse": {
        "type": "object",
        "description": "Mouse data as `mouse.x` `mouse.y` `mouse.pressed`"
      }
    },
    "methods": {},
    "computed": {},
    "template": "\n  <div\n    class=\"f-svg\"\n    :style=\"{ display: responsive ? 'block' : 'inline-flex', lineHeight: 0}\"\n  >\n    <div>\n      <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          :width=\"width\"\n          :height=\"height\"\n          :view-box.camel=\"viewBox\"\n          ref=\"f_svg\"\n          :id=\"id || defaultid\"\n          @mousemove=\"onMousemove\"\n          @touchmove=\"onMousemove\"\n          @mousedown=\"mousePressed = true\"\n          @touchstart=\"mousePressed = true\"\n          @mouseup=\"mousePressed = false\"\n          @touchend=\"mousePressed = false\"\n          :style=\"{ display: 'block', width: responsive ? '100%' : width, height: responsive ? 'auto' : height}\"\n      >\n        <g :transform=\"transform\" ref=\"f_svg_g\">\n          <slot :mouse=\"{x:mouseX,y:mouseY,pressed: mousePressed}\" />\n        </g>\n      </svg>\n      <!-- @TODO: Remove this / 2 hack -->\n      <button v-if=\"download\" style=\"margin-top: var(--base); display: block\" class=\"quaternary\" @click=\"onDownload\">⤓ Download</button>\n    </div>\n  </div>\n  ",
    "css": "\n    .f-svg + * {\n      margin-top: var(--base2);\n    }\n    .f-svg + .f-svg,\n    .f-svg + .f-svg + .f-svg,\n    .f-svg + .f-svg + .f-svg + .f-svg {\n      margin: 0;\n    }\n    .f-svg text {\n      fill: var(--primary);\n      font-family: var(--font-mono);\n      font-size: var(--text-size);\n      transform: var(--text-transform);\n      pointer-events: none;\n    }\n    \n  "
  },
  "FSynth": {
    "description": "\nPolyphonic synthesizer emitting basic analog waves.\n\n<f-buttons :buttons=\"['sine','square','triangle','sawtooth']\" set=\"o\" />\n\n<f-synth :osc=\"['sine','square','triangle','sawtooth'][get('o',0)]\" v-slot=\"{ noteon, noteoff }\">\n  <f-piano\n    v-on:noteon=\"noteon\"\n    v-on:noteoff=\"noteoff\"\n  />\n</f-synth>\n\n<p />\n\n> This component needs extra installation to work. See **Making music** tutorial.\n",
    "props": {
      "osc": {
        "default": "sine",
        "description": "Oscillator type, either `sine`, `square`, `triangle` or `sawtooth`"
      }
    },
    "methods": {},
    "template": "\n<div>\n  <slot :note=\"onNote\" :noteon=\"onNoteon\" :noteoff=\"onNoteoff\" /> \n</div>\n"
  },
  "FTable": {
    "components": {
      "FMarkdown": {
        "components": { "FRender": { "props": {}, "methods": {} } },
        "props": ["content"],
        "methods": {},
        "computed": {},
        "template": "\n    <f-render :content=\"'<div>' + marked(processedContent, { breaks: true }) + '</div>'\" />\n  "
      }
    },
    "description": "\nA table, accepting data in `:rows` attribute, supporting multiple formats:\n\n#### Array of arrays, no columns names\n\nColumn names are auto-generated.\n\n<f-table\n  :rows=\"[\n    ['Klaus','1926','Actor'],\n    ['Werner','1942','Director']\n  ]\"\n/>\n\n#### Array of arrays, with columns names\n\nColumn names come from `:cols` attribute.\n\n<f-table\n  :cols=\"['name','born','profession']\"\n  :rows=\"[\n    ['Klaus','1926','Actor'],\n    ['Werner','1942','Director']\n  ]\"\n/>\n\n#### Array of objects, no column names\n\nColumn names are extracted from object keys.\n\n<f-table\n  :rows=\"[\n  {\n  \tname: 'Klaus',\n    born: '1926',\n    profession: 'Actor'\n  },\n  {\n  \tname: 'Werner',\n    born: '1942',\n    profession: 'Director'\n  }\n  ]\"\n/>\n\n#### Array of objects, with column names\n\nColumn names come from `:cols` attribute.\n\n<f-table\n  :cols=\"['name','geboren','beruf']\"\n  :rows=\"[\n  {\n  \tname: 'Klaus',\n    born: '1926',\n    profession: 'Actor'\n  },\n  {\n  \tname: 'Werner',\n    born: '1942',\n    profession: 'Director'\n  }\n  ]\"\n/>\n\n  ",
    "props": { "rows": {}, "cols": {} },
    "computed": {},
    "template": "\n  <div v-if=\"currentRows.length\">\n  <table>\n    <thead>\n      <th\n        v-for=\"(h,i) in Object.keys(currentRows[0])\"\n        :key=\"i\"\n      >\n        <FMarkdown :content=\"cols[i] ? cols[i] : String(h).trim()\" />\n      </th>\n    </thead>\n    <tbody>\n      <tr v-for=\"(row,i) in currentRows\" :key=\"i\">\n        <td\n          v-for=\"(r,j) in Object.values(row)\"\n          :key=\"j\"\n        >\n          <FMarkdown :content=\"String(r).trim()\" />\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  </div>\n"
  },
  "FTabs": {
    "tag": "Layout",
    "description": "\nDisplays navigation tabs.\n\n<f-tabs\n  :buttons=\"['First','Second']\"\n/>\n  ",
    "props": ["buttons", "value"],
    "template": "\n    <div style=\"\n      display: flex;\n      height: 3rem;\n      borderBottom: var(--border-width) solid var(--darkgray);\n      overflow: auto;\n    \">\n      <div\n        v-for=\"(button,i) in buttons\"\n        :key=\"i\"\n        @click=\"$emit('input',i)\"\n        :style=\"{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          padding: i == 0 ? '0 1.25rem 0 2rem' : '0 1.25rem',\n          fontWeight: 'bold',\n          borderRight: 'var(--border-width) solid var(--darkgray)',\n          color: 'var(--darkgray)',\n          cursor: 'pointer',\n          background: i === value ? 'var(--gray)' : 'white'\n        }\"\n      >\n        {{ button }}\n      </div>\n    </div>\n  "
  },
  "FText": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "description": "\nAdds a text to the `f-scene`.  \n\n<f-scene grid>\n  <f-text>x:0 y:0</f-text>\n</f-scene>\n  ",
    "props": {
      "x": { "default": "", "type": [null, null] },
      "y": { "default": "", "type": [null, null] },
      "fill": { "default": "color('primary')" },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] }
    },
    "computed": {},
    "template": "\n  <f-group :transform=\"currentTransform\">\n    <text\n      text-anchor=\"middle\"\n      transform=\"scale(1,-1)\"\n      :style=\"{\n        fill: fillColor\n      }\"\n    >\n      <slot />\n    </text>\n  </f-group>\n  "
  },
  "FTheme": {
    "description": "\nThemes the content.\n\nTechnically it adjust CSS custom properties and redefines the color constants for the child elements.\n\n<f-buttons\n  :value=\"1\"\n  :buttons=\"['Light', 'Dark', 'Blue','Yellow']\n\">\n  <f-theme\n    slot-scope=\"data\"\n    :theme=\"['light', 'dark', 'blue', 'yellow'][data.value]\"\n    style=\"padding: 1rem;\"\n  >\n    <h2>Themed content</h2>\n    <p>Some <code>code</code> here</p>\n    <f-scene size=\"220px\">\n      <f-grid />\n      <f-circle />\n    </f-scene>\n  </f-theme>\n</f-buttons>\n  ",
    "props": { "theme": { "default": "light" } },
    "template": "\n    <div :style=\"themes[theme]\">\n      <slot />\n    </div>\n  "
  },
  "FToggle": {
    "description": "\nDisplays the toggle control.\n\n<f-toggle title=\"Toggle\" />\n\n<p />",
    "props": {
      "value": { "default": false, "type": [null, null] },
      "title": { "default": "" },
      "set": { "default": "", "description": "Name for global value to set" }
    },
    "methods": {},
    "template": "\n  <f-inline style=\"--inline-gap: calc(var(--base) / 2)\">\n  <f-artboard\n    :width=\"size * width\"\n    :height=\"size\"\n  >\n    <f-group @click.native=\"onClick\">\n      <rect\n        :x=\"padding\"\n        :y=\"padding\"\n        :width=\"(size * width) - (padding * 2)\"\n        :height=\"size - (padding * 2)\"\n        :rx=\"(size - (padding * 2)) / 2\"\n        :ry=\"(size - (padding * 2)) / 2\"\n        :fill=\"color(innerValue ? 'green' : 'gray')\"\n        stroke-width=\"2\"\n        stroke=\"var(--primary)\"\n      />\n      <f-circle\n        :r=\"(size - (padding * 2)) / 2\"\n        :x=\"innerValue ? (size * width) - (size / 2) : size / 2\"\n        :y=\"size / 2\"\n        fill=\"white\"\n        stroke-width=\"2\"\n      />\n    </f-group>\n  </f-artboard>\n  <div>{{ title }}</div>\n  </f-inline>\n  "
  },
  "FToolsIcon": {
    "description": "\nTools icon.\n  \n<f-tools-icon />\n\n<p />\n  ",
    "methods": {},
    "template": "\n  <f-scene :width=\"size\" :height=\"size\">\n    <f-circle \n      x=\"1\"\n      y=\"1\"\n      r=\"0.75\"\n      stroke=\"var(--icon-stroke)\"\n      stroke-width=\"2\"\n      fill=\"var(--icon-fill)\"\n    />\n    <f-circle \n      x=\"-1\"\n      y=\"-1\"\n      r=\"0.75\"\n      stroke=\"var(--icon-stroke)\"\n      stroke-width=\"2\"\n      fill=\"var(--icon-fill)\"\n    />\n    <f-box \n      x=\"-1\"\n      y=\"1\"\n      r=\"1.25\"\n      stroke=\"var(--icon-stroke)\"\n      stroke-width=\"2\"\n      fill=\"var(--icon-fill)\"\n    />\n    <f-box \n      x=\"1\"\n      y=\"-1\"\n      r=\"1.25\"\n      stroke=\"var(--icon-stroke)\"\n      stroke-width=\"2\"\n      fill=\"var(--icon-fill)\"\n    />\n  </f-scene>\n  "
  },
  "FTriangle": {
    "mixins": [
      { "computed": {}, "inject": { "svgScale": {}, "groupScale": {} } }
    ],
    "example": "\nDisplays a triangle.\n\n<f-scene grid>\n  <f-triangle />\n</f-scene>\n\n<f-scene grid>\n  <f-triangle points=\"0 0, 1 0, 0 1\"/>\n</f-scene>\n\n<f-scene grid>\n  <f-triangle\n    x1=\"0\" y1=\"0\"\n    x2=\"1\" y2=\"0\"\n    x3=\"0\" y3=\"1\"\n  />\n</f-scene>\n  ",
    "props": {
      "x": { "default": "", "type": [null, null] },
      "y": { "default": "", "type": [null, null] },
      "x1": { "default": "", "type": [null, null] },
      "y1": { "default": "", "type": [null, null] },
      "x2": { "default": "", "type": [null, null] },
      "y2": { "default": "", "type": [null, null] },
      "x3": { "default": "", "type": [null, null] },
      "y3": { "default": "", "type": [null, null] },
      "points": { "default": "", "type": [null, null, null] },
      "count": { "default": 6, "type": [null, null] },
      "r": { "default": 1, "type": [null, null] },
      "stroke": { "default": "color('primary')" },
      "strokeWidth": { "default": 3, "type": [null, null] },
      "fill": { "default": "none" },
      "position": { "default": "0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0", "type": [null, null, null, null] },
      "scale": { "default": "1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "multiply": { "default": false }
    },
    "computed": {},
    "template": "\n  <g>\n    <f-line\n      v-if=\"hasEdges && !points\"\n      :points=\"edges\"\n      :stroke=\"currentStrokeColor\"\n      :stroke-width=\"strokeWidth\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n      :fill=\"fill\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n      :closed=\"true\"\n      :scale=\"scale\"\n      :multiply=\"multiply\"\n    />\n    <f-line\n      v-if=\"!hasEdges && points\"\n      :points=\"points\"\n      :stroke=\"currentStrokeColor\"\n      :stroke-width=\"strokeWidth\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n      :fill=\"fill\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n      :closed=\"true\"\n      :scale=\"scale\"\n      :multiply=\"multiply\"\n    />\n    <f-regularpolygon\n      v-if=\"!hasEdges && !points\"\n      count=\"3\"\n      :x=\"x\"\n      :y=\"y\"\n      :r=\"r\"\n      :stroke=\"stroke\"\n      :stroke-width=\"strokeWidth\"\n      :fill=\"fill\"\n      :transform=\"transform\"\n      :opacity=\"opacity\"\n      :scale=\"scale\"\n      :multiply=\"multiply\"\n    />\n  </g>\n  "
  },
  "FTriangle3": {
    "description": "\nThe key building block of 3D graphics, this component draws a triangle in 3D space. It accepts three 3D coordinates in `points` array.\n\n<f-scene3>\n  <f-rotation3>\n    <f-grid3 />\n    <f-triangle3 points=\"1 1 0, 1 0 1, 1 -1 0\" /> \n  </f-rotation3>\n</f-scene3>\n  ",
    "mixins": [
      {
        "mixins": [
          {
            "inject": ["_baseUrl"],
            "props": { "baseUrl": {} },
            "methods": {},
            "template": "\n    <div><slot/></div>\n  "
          }
        ],
        "inject": ["parentObj"],
        "props": {
          "name": {},
          "type": { "default": "Object3D" },
          "obj": {},
          "scale": { "type": [null, null, null, null] },
          "position": { "type": [null, null, null] },
          "rotation": { "type": [null, null, null] }
        },
        "watch": {
          "scale": { "deep": true },
          "position": { "deep": true },
          "rotation": { "deep": true }
        },
        "methods": {}
      }
    ],
    "props": {
      "x1": { "default": 0, "type": [null, null] },
      "y1": { "default": 0, "type": [null, null] },
      "z1": { "default": 0, "type": [null, null] },
      "x2": { "default": 0, "type": [null, null] },
      "y2": { "default": 0, "type": [null, null] },
      "z2": { "default": 0, "type": [null, null] },
      "x3": { "default": 0, "type": [null, null] },
      "y3": { "default": 0, "type": [null, null] },
      "z3": { "default": 0, "type": [null, null] },
      "points": { "default": "", "type": [null, null, null] },
      "fill": { "default": "color('primary')" },
      "position": { "default": "0 0 0", "type": [null, null, null, null] },
      "rotation": { "default": "0 0 0", "type": [null, null, null, null] },
      "scale": { "default": "1 1 1", "type": [null, null, null, null] },
      "opacity": { "default": 1, "type": [null, null] },
      "shading": { "default": true }
    }
  },
  "FValue": {
    "description": "\nSets a global or local value. Value can be a string, number, array or object.\n\n### Setting and getting global values\n\n#### String\n\n<f-value value=\"Hello\" set=\"b\" />\n\n    b is {{ get('b', '') }}\n\n#### Number\n\n<f-value :value=\"1\" set=\"a\" />\n\n    a {{ get('a', 0) }}\n\n#### Array\n\n<f-value :value=\"[1,2,3]\" set=\"c\" />\n\n    First element of c is {{ get('c',[])[0] }}\n\n#### Object\n\n<f-value :value=\"{ hello: 1 }\" set=\"d\" />\n\n    Object d property \"hello\" is  {{ get('d',{}).hello }}\n\n\n### Example \n\nNote that the `value` is **evaluated only on initial page load** so it can useful when you need random numbers in your page that are not recalculated on each page refresh.\n\nHere is an example that sets up array of random coordinates and colors and animates the result:\n\n<f-value :value=\"range(0,100).map(_ => random(-2,2,true))\" set=\"randoms\" />\n\n<f-value :value=\"range(0,50).map(_ => any(colors()))\" set=\"colors\" />\n\n<f-scene>\n  <f-rotation>\n  <f-circle\n    v-for=\"(c,i) in chunk(get('randoms',[]),2)\"\n    :position=\"c\"\n    r=\"0.1\"\n    :fill=\"color(get('colors',[])[i])\"\n    stroke\n  />\n  </f-rotation>\n</f-scene>\n  ",
    "props": {
      "value": { "default": "", "type": [null, null, null, null, null] },
      "set": { "default": "", "description": "Name for a global value to set" }
    },
    "template": "\n  <div>\n    <slot :value=\"value\" />\n  </div>\n  "
  },
  "FVideo": {
    "props": { "src": { "default": "", "description": "Youtube video URL" } },
    "description": "\nShows a Youtube video.\n\n<f-video src=\"https://www.youtube.com/watch?v=JYHp8LwBUzo\" />\n  ",
    "computed": {},
    "template": "\n    <p style=\"\n      height: 0;\n      max-width: 100%;\n      overflow: hidden;\n      padding-bottom: calc(9 / 16 * 100%);\n      position: relative;\n    \">\n    <iframe\n        style=\"\n          height: 100%;\n          left: 0;\n          position: absolute;\n          top: 0;\n          width: 100%;\n        \"\n        :src=\"currentSrc\"\n        frameborder=\"0\"\n        allowfullscreen\n    />\n  </p>\n  "
  },
  "FVr": {
    "description": "\nVertical separator line\n\n<f-vr/>  \n  ",
    "template": "\n  <div style=\"\n    display: flex;\n    height: 100%;\n    justify-content: center;\n  \">\n  <div style=\"\n    display: flex;\n    width: 0;\n    border-left: 1.5px solid var(--primary);\n    border-right: 1.5px solid var(--primary);\n    height: 100%;\n  \">\n  &nbsp;\n  </div>\n  </div>\n  "
  },
  "FVrIcon": {
    "description": "\nVR icon.\n  \n<f-vr-icon />\n\n<p />\n    ",
    "props": {
      "size": {
        "default": "medium",
        "description": "Icon size: `small` `medium` `large`"
      }
    },
    "template": "\n  <f-icon icon=\"vr\" :size=\"size\" />\n  "
  },
  "FWebsocket": {
    "description": "\nSends and receives messages from websocket.\n\n***Note*** Websocket library socket.io is not included in standard Fachwerk release. Add following line to `index.html` to load websocket support:\n\n    <script src=\"https://unpkg.com/socket.io-client/dist/socket.io.slim.js\"></script>\n\n### Example\n\n<f-websocket\n  src=\"https://eka-server.now.sh\"\n  v-slot=\"{ send }\"\n  v-on:message=\"m => set('m',m)\">\n\n  <button v-on:click=\"send('Hello')\">\n    Send message \"Hello\"\n  </button>\n\n</f-websocket>\n\n<p />\n\n<output>Received message: {{ get('m') }}</output>\n\n  ",
    "props": {
      "src": {
        "default": "https://eka-server.now.sh",
        "description": "Websocket server URL"
      },
      "name": { "default": "message", "description": "Websocket event name" },
      "set": { "default": "", "description": "Name for a global value to set" }
    },
    "methods": {},
    "template": "\n  <div>\n    <slot :send=\"onSend\" /> \n  </div>\n  "
  }
}
