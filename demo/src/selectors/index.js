import Color from '../../../'

export const getFantasyColor = state => Color(state.color)

export const getBrightness = state => getFantasyColor(state).brightness()
