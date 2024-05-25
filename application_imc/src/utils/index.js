const uuid = () => {
    const heap = Date.now().toString(36);
    const tail = Math.random().toString(36).substring(2);
    return heap + tail;
};

export default uuid 
