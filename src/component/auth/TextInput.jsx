import { FieldError } from '@heroui/react';


const TextInput = ({ label, icon: Icon, children, error, required }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative flex items-center">
              {Icon && <span className="absolute left-3 text-zinc-400 pointer-events-none z-10"><Icon size={13} /></span>}
              {children}
            </div>
            {error && <FieldError className="text-xs text-red-500 font-medium">{error}</FieldError>}
          </div>
    );
};

export default TextInput;