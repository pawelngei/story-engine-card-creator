import BackWhiteAspect from './backgrounds/back/white/aspect.jpg'
import BackWhiteAgent from './backgrounds/back/white/agent.jpg'
import BackWhiteAnchor from './backgrounds/back/white/anchor.jpg'
import BackWhiteConflict from './backgrounds/back/white/conflict.jpg'
import BackWhiteEngine from './backgrounds/back/white/engine.jpg'
import BackDarkAspect from './backgrounds/back/dark/aspect.jpg'
import BackDarkAgent from './backgrounds/back/dark/agent.jpg'
import BackDarkAnchor from './backgrounds/back/dark/anchor.jpg'
import BackDarkConflict from './backgrounds/back/dark/conflict.jpg'
import BackDarkEngine from './backgrounds/back/dark/engine.jpg'
import FrontWhiteAspect from './backgrounds/front/white/aspect.jpg'
import FrontWhiteAgent from './backgrounds/front/white/agent.jpg'
import FrontWhiteAnchor from './backgrounds/front/white/anchor.jpg'
import FrontWhiteConflict from './backgrounds/front/white/conflict.jpg'
import FrontWhiteEngine from './backgrounds/front/white/engine.jpg'
import FrontLightAspect from './backgrounds/front/light/aspect.jpg'
import FrontLightAgent from './backgrounds/front/light/agent.jpg'
import FrontLightAnchor from './backgrounds/front/light/anchor.jpg'
import FrontLightConflict from './backgrounds/front/light/conflict.jpg'
import FrontLightEngine from './backgrounds/front/light/engine.jpg'
import FrontDarkAspect from './backgrounds/front/dark/aspect.jpg'
import FrontDarkAgent from './backgrounds/front/dark/agent.jpg'
import FrontDarkAnchor from './backgrounds/front/dark/anchor.jpg'
import FrontDarkConflict from './backgrounds/front/dark/conflict.jpg'
import FrontDarkEngine from './backgrounds/front/dark/engine.jpg'

type BackgroundsLibraryType = {
  [key: string]: {
    [quality: string]: {
      [type: string]: string
    }
  }
}

export const backgroundsLibrary: BackgroundsLibraryType = {
  back: {
    white: {
      aspect: BackWhiteAspect,
      agent: BackWhiteAgent,
      anchor: BackWhiteAnchor,
      conflict: BackWhiteConflict,
      engine: BackWhiteEngine
    },
    light: {
      aspect: BackDarkAspect,
      agent: BackDarkAgent,
      anchor: BackDarkAnchor,
      conflict: BackDarkConflict,
      engine: BackDarkEngine
    },
    dark: {
      aspect: BackDarkAspect,
      agent: BackDarkAgent,
      anchor: BackDarkAnchor,
      conflict: BackDarkConflict,
      engine: BackDarkEngine
    }
  },
  front: {
    white: {
      aspect: FrontWhiteAspect,
      agent: FrontWhiteAgent,
      anchor: FrontWhiteAnchor,
      conflict: FrontWhiteConflict,
      engine: FrontWhiteEngine
    },
    light: {
      aspect: FrontLightAspect,
      agent: FrontLightAgent,
      anchor: FrontLightAnchor,
      conflict: FrontLightConflict,
      engine: FrontLightEngine
    },
    dark: {
      aspect: FrontDarkAspect,
      agent: FrontDarkAgent,
      anchor: FrontDarkAnchor,
      conflict: FrontDarkConflict,
      engine: FrontDarkEngine
    }
  }
}