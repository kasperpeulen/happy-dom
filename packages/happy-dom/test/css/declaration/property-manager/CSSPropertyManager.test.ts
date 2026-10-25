import { describe, it, expect } from 'vitest';
import CSSPropertyManager from '../../../../src/css/declaration/property-manager/CSSPropertyManager.js';

describe('CSSPropertyManager', () => {
	describe('clone()', () => {
		it('Returns a copy with the same properties.', () => {
			const propertyManager = new CSSPropertyManager({
				cssText: 'color: red; font-size: 12px !important; --gap: 4px'
			});
			const clone = propertyManager.clone();

			expect(clone).not.toBe(propertyManager);
			expect(clone.properties).toEqual(propertyManager.properties);
			expect(clone.get('font-size')).toEqual({ value: '12px', important: true });
			expect(clone.getVariables()).toEqual({ '--gap': '4px' });
			expect(clone.toString()).toBe(propertyManager.toString());
		});

		it('Returns a copy whose properties can change without changing the original.', () => {
			const propertyManager = new CSSPropertyManager({ cssText: 'color: red; font-size: 1em' });
			const clone = propertyManager.clone();

			clone.properties['font-size'].value = '16px';
			clone.set('color', 'blue', false);
			clone.remove('font-size');

			expect(propertyManager.get('font-size')).toEqual({ value: '1em', important: false });
			expect(propertyManager.get('color')).toEqual({ value: 'red', important: false });
		});
	});
});
