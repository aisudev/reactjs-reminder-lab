const withController = (Controller) => (Component) => () => (
    <Controller>
        <Component />
    </Controller>
)

export default withController