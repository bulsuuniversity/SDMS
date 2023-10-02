

const ConfirmationModal = ({ children }) => {
    return (
        <div className={`fixed inset-0 flex bg-opacity-50 bg-gray-200 flex-col items-center justify-center z-50`}>
            <div className="rounded-lg">
                {children}
            </div>
        </div>
    );
}

export default ConfirmationModal;