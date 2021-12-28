// Autobind Decorator
// target
// method name
// descriptor
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    // access to original method
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        // we get original method and add bind to it
        get() {
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}

