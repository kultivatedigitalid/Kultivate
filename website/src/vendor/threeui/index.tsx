import { RibbonFieldBackground, type RibbonFieldBackgroundProps } from './src/shaders/ribbon-field/RibbonFieldBackground';

// The registered bundle supplies the ribbon component without its collection facade.
export function PredictiveArcCanvas({ variant, ...props }: RibbonFieldBackgroundProps & { variant: 'ribbon-field' }) {
  return variant === 'ribbon-field' ? <RibbonFieldBackground {...props} /> : null;
}
