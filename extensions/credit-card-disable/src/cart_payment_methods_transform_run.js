// @ts-check

// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").CartPaymentMethodsTransformRunInput} CartPaymentMethodsTransformRunInput
 * @typedef {import("../generated/api").CartPaymentMethodsTransformRunResult} CartPaymentMethodsTransformRunResult
 */

/**
 * @type {CartPaymentMethodsTransformRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

// The configured entrypoint for the 'cart.payment-methods.transform.run' extension target
/**
 * @param {CartPaymentMethodsTransformRunInput} input
 * @returns {CartPaymentMethodsTransformRunResult}
 */


export function cartPaymentMethodsTransformRun(input) {
  const TARGET_LOCATION = '35-אילת';

  const hasCaliforniaDelivery = input.cart.deliveryGroups.some(group => {
    const selected = group.selectedDeliveryOption;
    return selected && selected.title && selected.title.toLowerCase().includes(TARGET_LOCATION);
  });

  if (!hasCaliforniaDelivery) {
    return NO_CHANGES;
  }

  // Find the payment method to hide
  const hidePaymentMethod = input.paymentMethods
  .find(method => method.name.includes("כרטיס אשראי ואמצעי תשלום נוספים"));

   if (!hidePaymentMethod) {
    return NO_CHANGES;
  }

  return {
    operations: [{
      paymentMethodHide: {
        paymentMethodId: hidePaymentMethod.id
      }
    }]
  };
}