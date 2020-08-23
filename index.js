// 一.单元格点击
// 二.下完棋切换玩家
// 三.变量使用枚举
// 四.判赢函数
// 五.判断平局
// 六.展示获胜信息
// 七.重新开始游戏
// 3.1 创建字符串枚举Player
var Player;
(function (Player) {
    Player["X"] = "x";
    Player["O"] = "o";
})(Player || (Player = {}));
// 1.1 cells获取到所有的单元格列表元素cell
var cells = document.querySelectorAll('.cell');
// 2.1 创建一个存储当前玩家的变量currentPlayer，默认值为Player.X
var currentPlayer;
// gameBord以及获取游戏面板元素bord
var gameBord = document.querySelector('#bord');
// 6.1 message获取获胜信息面板元素message
var message = document.querySelector('#message');
// winner以及获取获胜者元素winner
var winner = document.querySelector('#winner');
// 7.1 restart获取按钮元素restart
var restart = document.querySelector('#restart');
// 4.2 创建胜利数组
var winsArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6] //两斜
];
// 5.1 记录下棋次数
var steps;
/*
cells.forEach(function(item){
    // 1.2 遍历单元格列表，给每一个单元格添加点击事件
    let cell = item as HTMLDivElement
    cell.addEventListener('click',clickCell,{once:true})
})
 */
startGame();
restart.addEventListener('click', startGame);
function startGame() {
    // 隐藏获胜信息、重置下棋次数、设置默认玩家、重置下棋提示
    message.style.display = 'none';
    steps = 0;
    currentPlayer = Player.X;
    gameBord.classList.remove(Player.X, Player.O);
    gameBord.classList.add(Player.X);
    cells.forEach(function (item) {
        var cell = item;
        // 清空棋盘
        cell.classList.remove(Player.X, Player.O);
        // 移除单元格点击事件，重新绑定单击事件
        cell.removeEventListener('click', clickCell);
        cell.addEventListener('click', clickCell, { once: true });
    });
}
// 1.封装点击函数
function clickCell(event) {
    // 1.3 给当前被点击的单元格添加类名
    var target = event.target;
    // 2.2 添加单元格类名添加变量
    target.classList.add(currentPlayer);
    // 5.2 下棋次数自增一次
    steps++;
    // 4.1 调用判赢函数来判断是否获胜
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        // 6.2 显示获胜信息面板
        message.style.display = 'block';
        // 6.3 设置获胜文本
        winner.innerText = currentPlayer + ' 赢了！';
        return;
    }
    // 5.3 判断是否下了9次棋（平局）
    if (steps === 9) {
        message.style.display = 'block';
        winner.innerText = '平局。';
        return;
    }
    // 2.3 下完棋后切换到另一个玩家
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    // 2.4 处理下一步提示
    gameBord.classList.remove(Player.X, Player.O);
    gameBord.classList.add(currentPlayer);
}
// 4.3 封装判赢函数
function checkWin(player) {
    // 4.3.1 使用some方法遍历winsArr二维数组
    // some()方法测试数组中是不是至少有1个元素通过了被提供的函数测试。
    return winsArr.some(function (item) {
        // 4.3.2 获取每种胜利情况的三个索引
        var cellIndex1 = item[0];
        var cellIndex2 = item[1];
        var cellIndex3 = item[2];
        // 4.3.3 通过索引从cells单元格中获取对应的单元格元素（优化精简）
        // 4.3.4 判断3个单元格元素是否同时包含当前玩家的类名Player
        if (hasClass(cells[cellIndex1], player) &&
            hasClass(cells[cellIndex2], player) &&
            hasClass(cells[cellIndex3], player)) {
            return true;
        }
        return false;
    });
}
// 4.3.5 封装判断DOM元素是否包含某个类名
// classList.contains（）方法判断html元素是否包含变量
function hasClass(el, name) {
    return el.classList.contains(name);
}
