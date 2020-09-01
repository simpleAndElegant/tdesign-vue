import { mount } from '@vue/test-utils';
import Table from '@/src/table/index.ts';

const data = [
  {
    id: 1,
    type: 'Number',
    value: '1',
  },
  {
    id: 2,
    type: 'Number',
    value: '2',
  },
];
const columns = [
  {
    title: 'id',
    colKey: 'id',
  },
  {
    title: '类型',
    colKey: 'type',
  },
  {
    title: '取值',
    colKey: 'value',
  },
];
const pagination = {
  pageSize: 10,
  total: 120,
  visibleWithOnePage: true,
};
// every component needs four parts: props/events/slots/functions.
describe('Table', () => {
  // test props api
  describe(':props', () => {
    describe(':prop.data', () => {
      it('`data` is not undefined', () => {
        const wrapper = mount({
          render() {
            return <Table data={data} columns={columns}></Table>;
          },
        });
        expect(wrapper.vm.$el.getElementsByTagName('tr').length).toBe(data.length + 1);
      });
      it('`data` is undefined', () => {
        const empty = {
          customRender: 'empty',
        };
        const wrapper = mount({
          render() {
            return <Table columns={columns} empty={empty}>
              <div slot="empty" id="empty-container">
                暂无数据
              </div>
            </Table>;
          },
        });
        expect(wrapper.find('#empty-container').exists()).toBe(true);
      });
    });
    describe(':props.columns', () => {
      it('`columns` is undefined', () => {
        const wrapper = mount({
          render() {
            return <Table></Table>;
          },
        });
        expect(wrapper).toMatchSnapshot();
      });
      it('`columns` with children', () => {
        const data = [
          {
            platform: '公有',
            property: 'data',
            type: 'any[]',
            default: '[]',
            needed: 'Y',
            description: '数据源',
          },
          {
            platform: '公有',
            property: 'rowkey',
            type: 'String',
            default: '-1',
            needed: 'Y',
            description: '指定rowkey',
          },
        ];
        const columns = [
          {
            title: '汇总属性',
            children: [
              {
                align: 'left',
                width: '100',
                minWidth: '100',
                className: 'test',
                ellipsis: true,
                colKey: 'platform',
                title: '平台',
              },
              {
                title: '类型及默认值',
                children: [
                  {
                    align: 'left',
                    width: '100',
                    minWidth: '100',
                    className: 'row',
                    ellipsis: true,
                    colKey: 'type',
                    title: '类型',
                  },
                  {
                    align: 'left',
                    width: '100',
                    minWidth: '100',
                    className: 'test4',
                    ellipsis: true,
                    colKey: 'default',
                    title: '默认值',
                  },
                  {
                    align: 'left',
                    width: '100',
                    minWidth: '100',
                    className: 'test3',
                    ellipsis: true,
                    colKey: 'needed',
                    title: '是否必传',
                  },
                ],
              },
            ],
          },
          {
            title: '属性及说明',
            children: [
              {
                align: 'left',
                width: '100',
                minWidth: '100',
                className: 'test2',
                ellipsis: true,
                colKey: 'property',
                title: '属性',
              },
              {
                align: 'left',
                width: '100',
                minWidth: '100',
                className: 'row',
                ellipsis: true,
                colKey: 'description',
                title: '说明',
              },
            ],
          },
        ];
        const wrapper = mount({
          render() {
            return <Table data={data} columns={columns}></Table>;
          },
        });
        expect(wrapper).toMatchSnapshot();
      });
      it('`columns` with fixed column', () => {
        const columns = [
          {
            title: 'id',
            colKey: 'id',
            fixed: 'left',
          },
          {
            title: '类型',
            colKey: 'type',
          },
          {
            title: '取值',
            colKey: 'value',
          },
        ];
        const wrapper = mount({
          render() {
            return <Table columns={columns} data={data}></Table>;
          },
        });
        expect(wrapper).toMatchSnapshot();
      });
      it('`columns` with align, width, minWidth and ellipsis', () => {
        const columns = [
          {
            title: 'id',
            colKey: 'id',
            width: 100,
            align: 'left',
            ellipsis: true,
            minWidth: 200,
          },
          {
            title: '类型',
            colKey: 'type',
          },
          {
            title: '取值',
            colKey: 'value',
          },
        ];
        const wrapper = mount({
          render() {
            return <Table columns={columns} data={data}></Table>;
          },
        });
        expect(wrapper).toMatchSnapshot();
      });
    });
    describe(':props.pagination', () => {
      it('`pagination` visibleWithOnePage is true', () => {
        const wrapper = mount({
          render() {
            return <Table data={data} columns={columns} pagination={pagination}></Table>;
          },
        });
        expect(wrapper.find('.t-table-pagination').exists()).toBe(true);
      });
    });
    describe(':props.empty', () => {
      it('`empty` is undefined', () => {
        const wrapper = mount({
          render() {
            return <Table columns={columns}></Table>;
          },
        });
        expect(wrapper.find('b').exists()).toBe(true);
      });
      it('`empty` is a Function', () => {
        const empty = jest.fn(() => { /* */ });
        mount({
          render() {
            return <Table columns={columns} empty={empty}></Table>;
          },
        });
        expect(empty.mock.calls.length).toBe(1);
      });
    });
    describe(':props.loading', () => {
      it('`loading` is synchronous', () => {
        const loading = true;
        const wrapper = mount({
          render() {
            return <Table columns={columns} loading={loading}></Table>;
          },
        });
        expect(wrapper.find('.t-table--loading').exists()).toBe(true);
      });
      it('`loading` is rendered with `slot`', () => {
        const wrapper = mount({
          render() {
            const loadingOpt = {
              customRender: 'loading',
            };
            const loading = () => <div class='loading__container'>loading</div>;
            const scopedSlots = {
              loading,
            };
            return <Table loading={loadingOpt} scopedSlots={scopedSlots} ></Table>;
          },
        });
        expect(wrapper.find('.loading__container').exists()).toBe(true);
      });
      it('`loading` is asynchronous', () => {
        const loading = {
          async: true,
        };
        const wrapper = mount({
          render() {
            return <Table columns={columns} loading={loading}></Table>;
          },
        });
        expect(wrapper.find('.t-table--loading-async').exists()).toBe(true);
      });
    });
    describe(':props.border, :props:hover, :props.stripe, :props.size, :props.verticalAlign, :props.height', () => {
      it('size = "small", verticalAlign="middle"', () => {
        const wrapper = mount({
          render() {
            return <Table
              data={data}
              columns={columns}
              border={true}
              stripe={true}
              size={'small'}
              hover={true}
              verticalAlign={'middle'}></Table>;
          },
        });
        expect(wrapper).toMatchSnapshot();
      });
      it('size = "large", verticalAlign="top"', () => {
        const wrapper = mount({
          render() {
            return <Table
                size={'large'}
                verticalAlign={'top'}></Table>;
          },
        });
        expect(wrapper).toMatchSnapshot();
      });
      it('size = "default", verticalAlign="bottom"', () => {
        const wrapper = mount({
          render() {
            return <Table
                size={'default'}
                verticalAlign={'bottom'}></Table>;
          },
        });
        expect(wrapper).toMatchSnapshot();
      });
      it('height = 100', () => {
        const wrapper = mount({
          render() {
            return <Table height={100} data={data} columns={columns}></Table>;
          },
        });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
  // test slots
  describe(':slots', () => {
    it('Use slot to customize cell', async () => {
      const wrapper = await mount({
        render() {
          const id = ({ text }) => <div class='cell'>{text}</div>;
          const scopedSlots = { id };
          return  <Table data={data} columns={columns} scopedSlots={scopedSlots}></Table>;
        },
      });
      expect(wrapper.findAll('.cell').length).toBe(data.length);
    });
    it('Use slot to customize header', async () => {
      const wrapper = await mount({
        render() {
          const slotColumns = columns.slice(0);
          slotColumns[0] = {
            colKey: 'id',
            slots: {
              title: 'columnId',
            },
          };
          const columnId = ({ text }) => <div class='header_cell'>{text}</div>;
          const scopedSlots = { columnId };
          return  <Table data={data} columns={slotColumns} scopedSlots={scopedSlots}></Table>;
        },
      });
      expect(wrapper.findAll('.header_cell').length).toBe(1);
    });
    it('Use slot to customize empty content', async () => {
      const wrapper = await mount({
        render() {
          const emptyProps = {
            customRender: 'empty',
          };
          const empty = () => <div class='empty__container'>empty</div>;
          const scopedSlots = { empty };
          return <Table empty={emptyProps} columns={columns} scopedSlots={scopedSlots}></Table>;
        },
      });
      expect(wrapper.find('.empty__container').exists()).toBe(true);
    });
  });
});