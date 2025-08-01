import { describe, it, expect } from 'vitest';
import { cartPaymentMethodsTransformRun } from './cart_payment_methods_transform_run';

/**
 * @typedef {import("../generated/api").CartPaymentMethodsTransformRunResult} CartPaymentMethodsTransformRunResult
 */



describe('payment customization function', () => {
  it('returns no operations without configuration', () => {
    const result = cartPaymentMethodsTransformRun({
      paymentCustomization: {
        metafield: null
      }
    });
    const expected = /** @type {CartPaymentMethodsTransformRunResult} */ ({ operations: [] });

    expect(result).toEqual(expected);
  });
});

describe('cartPaymentMethodsTransformRun', () => {
  it('returns no operations without configuration', () => {
    /** @type {CartPaymentMethodsTransformRunInput} */
    const input = {
      paymentCustomization: {
        metafield: null
      }
    };

    const result = cartPaymentMethodsTransformRun(input);
    /** @type {CartPaymentMethodsTransformRunResult} */
    const expected = { operations: [] };

    expect(result).toEqual(expected);
  });

  it('returns no operations if no California delivery', () => {
    /** @type {CartPaymentMethodsTransformRunInput} */
    const input = {
      cart: {
        deliveryGroups: [
          {
            selectedDeliveryOption: {
              title: "New York Express"
            }
          }
        ]
      },
      paymentMethods: [
        { id: "pm_1", name: "(for testing) Bogus Gateway" }
      ],
      paymentCustomization: {
        metafield: null
      }
    };

    const result = cartPaymentMethodsTransformRun(input);
    const expected = { operations: [] };

    expect(result).toEqual(expected);
  });

  it('returns no operations if no matching payment method', () => {
    /** @type {CartPaymentMethodsTransformRunInput} */
    const input = {
      cart: {
        deliveryGroups: [
          {
            selectedDeliveryOption: {
              title: "California Overnight"
            }
          }
        ]
      },
      paymentMethods: [
        { id: "pm_2", name: "Shopify Payments" }
      ],
      paymentCustomization: {
        metafield: null
      }
    };

    const result = cartPaymentMethodsTransformRun(input);
    const expected = { operations: [] };

    expect(result).toEqual(expected);
  });

  it('hides the bogus gateway payment method for California delivery', () => {
    /** @type {CartPaymentMethodsTransformRunInput} */
    const input = {
      cart: {
        deliveryGroups: [
          {
            selectedDeliveryOption: {
              title: "California Overnight"
            }
          }
        ]
      },
      paymentMethods: [
        { id: "pm_1", name: "(for testing) Bogus Gateway" },
        { id: "pm_2", name: "Shopify Payments" }
      ],
      paymentCustomization: {
        metafield: null
      }
    };

    const result = cartPaymentMethodsTransformRun(input);
    const expected = {
      operations: [
        {
          paymentMethodHide: {
            paymentMethodId: "pm_1"
          }
        }
      ]
    };

    expect(result).toEqual(expected);
  });
});