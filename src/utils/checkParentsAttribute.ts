export function checkParentsAttribute(
  element: Node,
  attributeName: string,
  attributeValue: string | null = null,
) {
  if (element instanceof HTMLElement) {
    const currentAttributeValue = element.getAttribute(attributeName);

    if (
      currentAttributeValue != null &&
      (attributeValue == null || attributeValue === currentAttributeValue)
    )
      return element;
  }

  if (element.parentElement == null) return null;

  return checkParentsAttribute(
    element.parentElement,
    attributeName,
    attributeValue,
  );
}
